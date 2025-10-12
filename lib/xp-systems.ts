import { supabase } from "./supabaseClient"

// XP reward amounts for different actions
export const XP_REWARDS = {
  // Profile actions
  COMPLETE_PROFILE: 50,
  ADD_AVATAR: 20,
  ADD_PHONE: 10,
  VERIFY_EMAIL: 50,
  ADD_BIO: 15,
  
  // Property actions
  VIEW_PROPERTY: 5,
  SAVE_PROPERTY: 10,
  CONTACT_LANDLORD: 15,
  
  // Roommate actions
  CREATE_ROOMMATE_PROFILE: 30,
  SEND_ROOMMATE_REQUEST: 10,
  ACCEPT_ROOMMATE: 20,
  
  // Social actions
  SEND_MESSAGE: 10,
  RECEIVE_MESSAGE: 5,
  MAKE_CONNECTION: 15,
  
  // Content actions
  DOWNLOAD_MATERIAL: 10,
  UPLOAD_MATERIAL: 25,
  RATE_PROPERTY: 10,
  WRITE_REVIEW: 20,
  
  // Attendance
  RSVP_EVENT: 15,
  ATTEND_EVENT: 30,
  
  // Daily actions
  DAILY_LOGIN: 10,
  MAINTAIN_STREAK: 5,
  
  // Referrals
  REFER_FRIEND: 100,
  FRIEND_COMPLETES_PROFILE: 50,
}

// Award XP to a user
export async function awardXP(userId: string, amount: number, reason: string) {
  try {
    // Get current user data
    const { data: profile, error: fetchError } = await supabase
      .from("user_profiles")
      .select("xp, level")
      .eq("id", userId)
      .single()

    if (fetchError) throw fetchError

    const currentXP = profile?.xp || 0
    const newXP = currentXP + amount
    const newLevel = Math.floor(newXP / 100) + 1

    // Update user XP and level
    const { error: updateError } = await supabase
      .from("user_profiles")
      .update({
        xp: newXP,
        level: newLevel,
      })
      .eq("id", userId)

    if (updateError) throw updateError

    // Log XP transaction
    await logXPTransaction(userId, amount, reason, newXP)

    // Check for level up
    if (newLevel > (profile?.level || 1)) {
      await handleLevelUp(userId, newLevel)
    }

    return { success: true, newXP, newLevel, leveledUp: newLevel > (profile?.level || 1) }
  } catch (error) {
    console.error("Error awarding XP:", error)
    return { success: false, error }
  }
}

// Log XP transaction for history
async function logXPTransaction(userId: string, amount: number, reason: string, newTotal: number) {
  try {
    await supabase.from("xp_transactions").insert({
      user_id: userId,
      amount,
      reason,
      new_total: newTotal,
      created_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error logging XP transaction:", error)
  }
}

// Handle level up rewards and notifications
async function handleLevelUp(userId: string, newLevel: number) {
  try {
    // Award bonus XP for leveling up
    const bonusXP = newLevel * 10

    // You could send a notification here
    console.log(`User ${userId} leveled up to ${newLevel}! Bonus: ${bonusXP} XP`)

    // Unlock achievements based on level
    await checkLevelAchievements(userId, newLevel)
  } catch (error) {
    console.error("Error handling level up:", error)
  }
}

// Check and unlock level-based achievements
async function checkLevelAchievements(userId: string, level: number) {
  const achievements = []

  if (level >= 5) achievements.push("level_5")
  if (level >= 10) achievements.push("level_10")
  if (level >= 25) achievements.push("level_25")
  if (level >= 50) achievements.push("level_50")
  if (level >= 100) achievements.push("level_100")

  if (achievements.length > 0) {
    // Update user achievements
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("achievements")
      .eq("id", userId)
      .single()

    const currentAchievements = profile?.achievements || []
    const newAchievements = [...new Set([...currentAchievements, ...achievements])]

    await supabase
      .from("user_profiles")
      .update({ achievements: newAchievements })
      .eq("id", userId)
  }
}

// Update user's login streak
export async function updateLoginStreak(userId: string) {
  try {
    const { data: profile, error } = await supabase
      .from("user_profiles")
      .select("login_streak, last_login_at")
      .eq("id", userId)
      .single()

    if (error) throw error

    const now = new Date()
    const lastLogin = profile?.last_login_at ? new Date(profile.last_login_at) : null
    let newStreak = profile?.login_streak || 0

    if (lastLogin) {
      const hoursSinceLastLogin = (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60)

      if (hoursSinceLastLogin < 24) {
        // Same day login - no change
        return { streak: newStreak }
      } else if (hoursSinceLastLogin < 48) {
        // Consecutive day login
        newStreak += 1
        await awardXP(userId, XP_REWARDS.MAINTAIN_STREAK, "Daily streak maintained")
      } else {
        // Streak broken
        newStreak = 1
      }
    } else {
      // First login
      newStreak = 1
    }

    // Update streak and last login
    await supabase
      .from("user_profiles")
      .update({
        login_streak: newStreak,
        last_login_at: now.toISOString(),
      })
      .eq("id", userId)

    // Award daily login XP
    await awardXP(userId, XP_REWARDS.DAILY_LOGIN, "Daily login")

    return { streak: newStreak }
  } catch (error) {
    console.error("Error updating login streak:", error)
    return { streak: 0 }
  }
}

// Get user stats for gamification
export async function getUserStats(userId: string) {
  try {
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single()

    // Count various activities
    const [
      { count: propertiesViewed },
      { count: messagesSent },
      { count: materialsDownloaded },
      { count: connectionsCount },
    ] = await Promise.all([
      supabase.from("property_views").select("*", { count: "exact", head: true }).eq("user_id", userId),
      supabase.from("messages").select("*", { count: "exact", head: true }).eq("sender_id", userId),
      supabase.from("material_downloads").select("*", { count: "exact", head: true }).eq("user_id", userId),
      supabase.from("connections").select("*", { count: "exact", head: true }).eq("user_id", userId),
    ])

    return {
      xp: profile?.xp || 0,
      level: profile?.level || 1,
      loginStreak: profile?.login_streak || 0,
      achievements: profile?.achievements || [],
      propertiesViewed: propertiesViewed || 0,
      messagesSent: messagesSent || 0,
      materialsDownloaded: materialsDownloaded || 0,
      connections: connectionsCount || 0,
      referralCount: profile?.referral_count || 0,
    }
  } catch (error) {
    console.error("Error getting user stats:", error)
    return {
      xp: 0,
      level: 1,
      loginStreak: 0,
      achievements: [],
      propertiesViewed: 0,
      messagesSent: 0,
      materialsDownloaded: 0,
      connections: 0,
      referralCount: 0,
    }
  }
}

// Get leaderboard
export async function getLeaderboard(limit = 10) {
  try {
    const { data: users, error } = await supabase
      .from("user_profiles")
      .select("id, full_name, xp, level, avatar_url")
      .order("xp", { ascending: false })
      .limit(limit)

    if (error) throw error

    return users?.map((user, index) => ({
      id: user.id,
      name: user.full_name,
      points: user.xp,
      level: user.level,
      avatar: user.avatar_url,
      rank: index + 1,
    })) || []
  } catch (error) {
    console.error("Error getting leaderboard:", error)
    return []
  }
}

// Track action and award XP
export async function trackAction(userId: string, action: keyof typeof XP_REWARDS) {
  const xpAmount = XP_REWARDS[action]
  if (!xpAmount) return { success: false, error: "Invalid action" }

  return await awardXP(userId, xpAmount, action.replace(/_/g, " ").toLowerCase())
}