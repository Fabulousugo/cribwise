import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wand2 } from "lucide-react"
import Link from "next/link"

export function AIListingPrompt() {
  return (
    <Card className="border-purple-300 bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 mb-6">
      <CardContent className="py-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex-shrink-0">
            <Wand2 className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1 text-purple-900">
              ⚡ Save Time with AI
            </h3>
            <p className="text-sm text-purple-700 mb-3">
              Let AI write your property listing in seconds! Just speak or type basic details and get a professional description instantly.
            </p>
            <Link href="/agent/properties/generate">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Try AI Generator
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}