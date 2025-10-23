/* eslint-disable @typescript-eslint/no-explicit-any */
// ==========================================
// FILE: lib/xp-systems.ts
// Fixed XP & Gamification System with Proper Error Handling
// ==========================================

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

// ==========================================
// Login Streak System
// ==========================================

export async function updateLoginStreak(userId: string) {
  if (!userId) {
    console.error('updateLoginStreak: userId is required')
    return { success: false, error: 'User ID is required' }
  }

  try {
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    
    // Get current user stats
    const { data: stats, error: fetchError } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching user stats:', fetchError)
      return { success: false, error: fetchError.message }
    }

    // If no stats exist, create initial record
    if (!stats) {
      const { error: insertError } = await supabase
        .from('user_stats')
        .insert({
          user_id: userId,
          login_streak: 1,
          last_login: today,
          xp: 0
        })

      if (insertError) {
        console.error('Error creating user stats:', insertError)
        return { success: false, error: insertError.message }
      }

      // Award XP for first login
      await awardXP(userId, 10, 'first_login')
      return { success: true, streak: 1, xp_awarded: 10 }
    }

    // Check if already logged in today
    if (stats.last_login === today) {
      return { success: true, streak: stats.login_streak, already_logged_today: true }
    }

    // Calculate if streak continues or breaks
    const lastLogin = new Date(stats.last_login)
    const todayDate = new Date(today)
    const diffTime = todayDate.getTime() - lastLogin.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    let newStreak = stats.login_streak
    let xpAwarded = 0

    if (diffDays === 1) {
      // Consecutive day - increment streak
      newStreak = stats.login_streak + 1
      xpAwarded = 10 + Math.min(newStreak * 5, 50) // Max 50 XP bonus
    } else if (diffDays > 1) {
      // Streak broken - reset to 1
      newStreak = 1
      xpAwarded = 10
    }

    // Update stats
    const { error: updateError } = await supabase
      .from('user_stats')
      .update({
        login_streak: newStreak,
        last_login: today
      })
      .eq('user_id', userId)

    if (updateError) {
      console.error('Error updating user stats:', updateError)
      return { success: false, error: updateError.message }
    }

    // Award XP
    if (xpAwarded > 0) {
      await awardXP(userId, xpAwarded, 'daily_login')
    }

    return { 
      success: true, 
      streak: newStreak, 
      xp_awarded: xpAwarded,
      streak_broken: diffDays > 1
    }

  } catch (error) {
    console.error('Error in updateLoginStreak:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// ==========================================
// XP Award System
// ==========================================

export async function awardXP(
  userId: string, 
  xpAmount: number, 
  reason: string
) {
  if (!userId) {
    console.error('awardXP: userId is required')
    return { success: false, error: 'User ID is required' }
  }

  if (xpAmount <= 0) {
    console.error('awardXP: xpAmount must be positive')
    return { success: false, error: 'XP amount must be positive' }
  }

  try {
    // Get current XP
    const { data: stats, error: fetchError } = await supabase
      .from('user_stats')
      .select('xp')
      .eq('user_id', userId)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching user XP:', fetchError)
      return { success: false, error: fetchError.message }
    }

    const currentXP = stats?.xp || 0
    const newXP = currentXP + xpAmount

    // Update or insert XP
    const { error: upsertError } = await supabase
      .from('user_stats')
      .upsert({
        user_id: userId,
        xp: newXP
      }, {
        onConflict: 'user_id'
      })

    if (upsertError) {
      console.error('Error updating XP:', upsertError)
      return { success: false, error: upsertError.message }
    }

    // Log XP transaction
    await supabase
      .from('xp_transactions')
      .insert({
        user_id: userId,
        amount: xpAmount,
        reason: reason,
        created_at: new Date().toISOString()
      })

    return { 
      success: true, 
      new_xp: newXP, 
      awarded: xpAmount 
    }

  } catch (error) {
    console.error('Error in awardXP:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// ==========================================
// Get User Stats
// ==========================================

export async function getUserStats(userId: string) {
  if (!userId) {
    console.error('getUserStats: userId is required')
    return null
  }

  try {
    const { data: stats, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user stats:', error)
      return null
    }

    // Return default stats if user has none
    if (!stats) {
      return {
        user_id: userId,
        xp: 0,
        login_streak: 0,
        last_login: null,
        properties_viewed: 0,
        connections_made: 0,
        materials_downloaded: 0,
        messages_sent: 0,
        referral_count: 0
      }
    }

    return stats

  } catch (error) {
    console.error('Error in getUserStats:', error)
    return null
  }
}

// ==========================================
// Level Calculation
// ==========================================

export function calculateLevel(xp: number): number {
  // Simple level formula: Level = floor(sqrt(XP / 100))
  // Level 1: 0-99 XP
  // Level 2: 100-399 XP
  // Level 3: 400-899 XP
  // Level 4: 900-1599 XP
  // etc.
  return Math.floor(Math.sqrt(xp / 100)) + 1
}

export function getXPForNextLevel(currentLevel: number): number {
  // XP needed for next level
  return currentLevel * currentLevel * 100
}

export function getXPProgress(xp: number): {
  currentLevel: number
  xpInCurrentLevel: number
  xpNeededForNextLevel: number
  progressPercentage: number
} {
  const currentLevel = calculateLevel(xp)
  const xpForCurrentLevel = (currentLevel - 1) * (currentLevel - 1) * 100
  const xpForNextLevel = getXPForNextLevel(currentLevel)
  const xpInCurrentLevel = xp - xpForCurrentLevel
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel
  const progressPercentage = (xpInCurrentLevel / xpNeededForNextLevel) * 100

  return {
    currentLevel,
    xpInCurrentLevel,
    xpNeededForNextLevel,
    progressPercentage: Math.min(progressPercentage, 100)
  }
}

// ==========================================
// Activity Tracking
// ==========================================

export async function trackActivity(
  userId: string,
  activityType: 'property_view' | 'connection_made' | 'material_download' | 'message_sent',
  metadata?: Record<string, any>
) {
  if (!userId) {
    console.error('trackActivity: userId is required')
    return { success: false, error: 'User ID is required' }
  }

  try {
    // Increment stat counter
    const statField = `${activityType}s` // property_views, connections_made, etc.
    
    const { error: updateError } = await supabase.rpc('increment_stat', {
      p_user_id: userId,
      p_stat_field: statField
    })

    if (updateError) {
      console.error('Error incrementing stat:', updateError)
      // Don't return error - we'll create the record if it doesn't exist
      
      // Try manual increment
      const { data: stats } = await supabase
        .from('user_stats')
        .select(statField)
        .eq('user_id', userId)
        .single()

      const currentValue = stats?.[statField] || 0
      
      await supabase
        .from('user_stats')
        .upsert({
          user_id: userId,
          [statField]: currentValue + 1
        }, {
          onConflict: 'user_id'
        })
    }

    // Log activity
    await supabase
      .from('user_activities')
      .insert({
        user_id: userId,
        activity_type: activityType,
        metadata: metadata || {},
        created_at: new Date().toISOString()
      })

    return { success: true }

  } catch (error) {
    console.error('Error in trackActivity:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// ==========================================
// Referral System
// ==========================================

export async function trackReferral(referrerId: string, referredUserId: string) {
  if (!referrerId || !referredUserId) {
    console.error('trackReferral: both referrerId and referredUserId are required')
    return { success: false, error: 'Both user IDs are required' }
  }

  try {
    // Create referral record
    const { error: referralError } = await supabase
      .from('referrals')
      .insert({
        referrer_id: referrerId,
        referred_user_id: referredUserId,
        created_at: new Date().toISOString()
      })

    if (referralError) {
      console.error('Error creating referral:', referralError)
      return { success: false, error: referralError.message }
    }

    // Award XP to referrer
    await awardXP(referrerId, 100, 'referral')

    // Increment referral count
    await supabase.rpc('increment_stat', {
      p_user_id: referrerId,
      p_stat_field: 'referral_count'
    })

    return { success: true, xp_awarded: 100 }

  } catch (error) {
    console.error('Error in trackReferral:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}