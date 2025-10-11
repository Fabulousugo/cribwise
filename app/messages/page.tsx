"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, MessageCircle, Inbox } from "lucide-react"

type Conversation = {
  id: number
  user1_id: string
  user2_id: string
  last_message_at: string
  other_user_name: string
  other_user_id: string
  last_message: string
  unread_count: number
}

export default function MessagesPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loadingConversations, setLoadingConversations] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      loadConversations()
    }
  }, [user])

  async function loadConversations() {
    setLoadingConversations(true)
    try {
      // Get all conversations for this user
      const { data: convData, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .or(`user1_id.eq.${user!.id},user2_id.eq.${user!.id}`)
        .order('last_message_at', { ascending: false })

      if (convError) throw convError

      // For each conversation, get the other user's details and last message
      const conversationsWithDetails = await Promise.all(
        (convData || []).map(async (conv) => {
          const otherUserId = conv.user1_id === user!.id ? conv.user2_id : conv.user1_id

          // Get other user's profile
          const { data: profileData } = await supabase
            .from('user_profiles')
            .select('full_name')
            .eq('id', otherUserId)
            .single()

          // Get last message
          const { data: lastMsg } = await supabase
            .from('messages')
            .select('message')
            .eq('conversation_id', conv.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

          // Count unread messages
          const { count } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .eq('conversation_id', conv.id)
            .eq('receiver_id', user!.id)
            .eq('read', false)

          return {
            ...conv,
            other_user_name: profileData?.full_name || 'Unknown User',
            other_user_id: otherUserId,
            last_message: lastMsg?.message || 'No messages yet',
            unread_count: count || 0
          }
        })
      )

      setConversations(conversationsWithDetails)

    } catch (error) {
      console.error('Error loading conversations:', error)
    } finally {
      setLoadingConversations(false)
    }
  }

  if (loading || loadingConversations) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-2xl">Loading messages...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/dashboard">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Messages</h1>
          <p className="text-slate-600">Your conversations with potential roommates</p>
        </div>

        {/* Conversations List */}
        {conversations.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Inbox className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
              <p className="text-slate-600 mb-6">
                Start a conversation by viewing a roommate&apos;s profile and clicking &quot;Send Message&quot;
              </p>
              <Link href="/roommate/browse">
                <Button>Browse Roommates</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {conversations.map((conversation) => (
              <Link key={conversation.id} href={`/messages/${conversation.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {conversation.other_user_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-lg">{conversation.other_user_name}</h3>
                          <span className="text-xs text-slate-500">
                            {new Date(conversation.last_message_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 truncate">
                          {conversation.last_message}
                        </p>
                      </div>

                      {conversation.unread_count > 0 && (
                        <Badge variant="default" className="ml-2">
                          {conversation.unread_count}
                        </Badge>
                      )}

                      <MessageCircle className="h-5 w-5 text-slate-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}