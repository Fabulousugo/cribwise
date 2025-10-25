// ==========================================
// FILE: lib/xp-systems-safe.ts
// XP Systems with Safe Error Handling
// ==========================================

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabase = createClientComponentClient()

// ==========================================
// SAFE WRAPPERS - Return defaults on error
// ==========================================

/**
 * Safely get user stats - returns defaults if DB tables don't exist
 */
export async function getUserStats(userId: string) {
  if (!userId || userId === 'user-id-placeholder' || userId === 'placeholder') {
    return {
      xp: 0,
      level: 1,
      loginStreak: 0,
      totalAchievements: 0,
      referralCount: 0
    }
  }

  try {
    // Try to get user stats from database
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      console.warn("User stats table doesn't exist or query failed:", error.message)
      return createDefaultStats(userId)
    }

    return data || createDefaultStats(userId)
  } catch (error) {
    console.warn("Error in getUserStats:", error)
    return createDefaultStats(userId)
  }
}

/**
 * Safely update login streak - fails gracefully if table doesn't exist
 */
export async function updateLoginStreak(userId: string) {
  if (!userId || userId === 'user-id-placeholder' || userId === 'placeholder') {
    return
  }

  try {
    const today = new Date().toISOString().split('T')[0]

    // Check if user logged in today already
    const { data: existingStreak, error: fetchError } = await supabase
      .from('user_stats')
      .select('last_login_date, login_streak')
      .eq('user_id', userId)
      .single()

    if (fetchError) {
      console.warn("Login streak table doesn't exist:", fetchError.message)
      return
    }

    if (existingStreak?.last_login_date === today) {
      return // Already logged in today
    }

    // Calculate new streak
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    const isConsecutive = existingStreak?.last_login_date === yesterdayStr
    const newStreak = isConsecutive ? (existingStreak.login_streak || 0) + 1 : 1

    // Update streak
    await supabase
      .from('user_stats')
      .update({
        last_login_date: today,
        login_streak: newStreak,
        updated_at: new Date()
      })
      .eq('user_id', userId)

  } catch (error) {
    console.warn("Error updating login streak:", error)
    // Fail silently - don't break the UI
  }
}

/**
 * Safely award XP - creates record if doesn't exist
 */
export async function awardXP(
  userId: string, 
  xpAmount: number, 
  reason?: string
) {
  if (!userId || userId === 'user-id-placeholder' || userId === 'placeholder') {
    console.log(`[MOCK] Would award ${xpAmount} XP for: ${reason}`)
    return
  }

  try {
    // Get current stats
    const { data: stats, error: fetchError } = await supabase
      .from('user_stats')
      .select('xp')
      .eq('user_id', userId)
      .single()

    if (fetchError) {
      // Table might not exist - try to create it
      console.warn("XP table doesn't exist, attempting to create record:", fetchError.message)
      
      const { error: insertError } = await supabase
        .from('user_stats')
        .insert({
          user_id: userId,
          xp: xpAmount,
          level: 1,
          login_streak: 0,
          created_at: new Date()
        })

      if (insertError) {
        console.error("Failed to create XP record:", insertError)
        return
      }

      console.log(`✅ Created XP record with ${xpAmount} XP`)
      return
    }

    // Update existing XP
    const newXP = (stats?.xp || 0) + xpAmount

    const { error: updateError } = await supabase
      .from('user_stats')
      .update({ 
        xp: newXP,
        updated_at: new Date()
      })
      .eq('user_id', userId)

    if (updateError) {
      console.error("Failed to update XP:", updateError)
      return
    }

    console.log(`✅ Awarded ${xpAmount} XP (Total: ${newXP})`)

    // Log XP transaction if table exists
    try {
      await supabase
        .from('xp_transactions')
        .insert({
          user_id: userId,
          xp_amount: xpAmount,
          reason: reason || 'Unknown',
          created_at: new Date()
        })
    } catch (txError) {
      console.warn("XP transaction logging failed (table may not exist):", txError)
    }

  } catch (error) {
    console.error("Error awarding XP:", error)
    // Fail silently - don't break the UI
  }
}

/**
 * Calculate level from XP
 */
export function calculateLevel(xp: number): number {
  // Level formula: Level = floor(sqrt(XP / 100))
  // Level 1 = 0-99 XP
  // Level 2 = 100-399 XP
  // Level 3 = 400-899 XP
  // etc.
  return Math.floor(Math.sqrt(xp / 100)) + 1
}

/**
 * Get XP needed for next level
 */
export function getXPForNextLevel(currentLevel: number): number {
  // XP needed = (level^2) * 100
  return Math.pow(currentLevel, 2) * 100
}

/**
 * Create default stats object
 */
function createDefaultStats(userId: string) {
  return {
    user_id: userId,
    xp: 0,
    level: 1,
    login_streak: 0,
    last_login_date: null,
    total_achievements: 0,
    referral_count: 0,
    created_at: new Date(),
    updated_at: new Date()
  }
}

// ==========================================
// OPTIONAL: Check if tables exist
// ==========================================

/**
 * Check if gamification tables are set up
 */
export async function checkGamificationSetup(): Promise<{
  isSetup: boolean
  missingTables: string[]
}> {
  const requiredTables = ['user_stats', 'xp_transactions', 'achievements']
  const missingTables: string[] = []

  for (const table of requiredTables) {
    try {
      const { error } = await supabase
        .from(table)
        .select('*')
        .limit(1)

      if (error && error.message.includes('does not exist')) {
        missingTables.push(table)
      }
    } catch (error) {
      missingTables.push(table)
    }
  }

  return {
    isSetup: missingTables.length === 0,
    missingTables
  }
}

// ==========================================
// SQL SCHEMA FOR SETUP
// ==========================================

export const GAMIFICATION_SCHEMA = `
-- Run this in Supabase SQL Editor to set up gamification

-- 1. User Stats Table
CREATE TABLE IF NOT EXISTS user_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  login_streak INTEGER DEFAULT 0,
  last_login_date DATE,
  total_achievements INTEGER DEFAULT 0,
  referral_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. XP Transactions Table (for audit trail)
CREATE TABLE IF NOT EXISTS xp_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  xp_amount INTEGER NOT NULL,
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL,
  achievement_name TEXT NOT NULL,
  earned_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, achievement_type)
);

-- 4. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_xp_transactions_user_id ON xp_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON achievements(user_id);

-- 5. RLS Policies (users can only see their own data)
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own stats" ON user_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON xp_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own achievements" ON achievements
  FOR SELECT USING (auth.uid() = user_id);

-- 6. Function to auto-update level based on XP
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
BEGIN
  NEW.level := FLOOR(SQRT(NEW.xp / 100)) + 1;
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_level_on_xp_change
  BEFORE UPDATE OF xp ON user_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_user_level();
`