"use client"

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  CalendarDays, 
  MapPin, 
  Users, 
  Image as ImageIcon,
  Sparkles,
  ArrowLeft,
  Plus,
  X,
  Zap
} from "lucide-react";

const categories = [
  "Workshop",
  "Career Fair",
  "Tech Meetup",
  "Social",
  "Sports",
  "Competition",
  "Conference",
  "Concert",
  "Other"
];

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be less than 5MB');
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setImageUrl("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In real app, submit to API here
    // const formData = new FormData(e.currentTarget);
    // await fetch('/api/events', { method: 'POST', body: formData });

    setIsSubmitting(false);
    router.push("/events?success=true");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      {/* Header */}
      <section className="relative py-12 px-4 overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse delay-75"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/events" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Link>
          </Button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-full mb-4">
              <Sparkles className="h-4 w-4" /> Create Event
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
              List Your Event 🎉
            </h1>
            
            <p className="text-slate-700 dark:text-slate-300 text-lg max-w-2xl mx-auto">
              Share your campus event with thousands of students. Fill in the details below and let's make it happen!
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <Card className="border-2 border-purple-100 dark:border-purple-900/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Event Details</CardTitle>
                <CardDescription className="dark:text-slate-400">
                  Provide all the important information about your event
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Event Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-semibold">
                    Event Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Tech Career Fair 2025"
                    required
                    className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base font-semibold">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Tell students what this event is about, what they'll learn or experience..."
                    required
                    rows={5}
                    className="border-2 border-slate-200 dark:border-slate-700 rounded-xl resize-none"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Be detailed! Include what attendees can expect, who should attend, and any prerequisites.
                  </p>
                </div>

                {/* Category & School */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-base font-semibold">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select name="category" required>
                      <SelectTrigger className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat.toLowerCase()}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="school" className="text-base font-semibold">
                      School/University <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="school"
                      name="school"
                      placeholder="e.g., UNILAG"
                      required
                      className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                </div>

                {/* Date & Time */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <CalendarDays className="h-5 w-5" />
                    Date & Time <span className="text-red-500">*</span>
                  </Label>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate" className="text-sm">Start Date & Time</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="datetime-local"
                        required
                        className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate" className="text-sm">End Date & Time (Optional)</Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="datetime-local"
                        className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-base font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Main Auditorium, Faculty of Science"
                    required
                    className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Be specific so attendees can find you easily
                  </p>
                </div>

                {/* Capacity */}
                <div className="space-y-2">
                  <Label htmlFor="capacity" className="text-base font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Expected Capacity (Optional)
                  </Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    placeholder="e.g., 200"
                    className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Event Image (Optional)
                  </Label>

                  {/* Toggle between URL and File Upload */}
                  <div className="flex gap-2 mb-3">
                    <Button
                      type="button"
                      variant={uploadMethod === "url" ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setUploadMethod("url");
                        setImageFile(null);
                        setImagePreview("");
                      }}
                      className={uploadMethod === "url" ? "bg-gradient-to-r from-purple-600 to-blue-600" : ""}
                    >
                      Image URL
                    </Button>
                    <Button
                      type="button"
                      variant={uploadMethod === "file" ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setUploadMethod("file");
                        setImageUrl("");
                      }}
                      className={uploadMethod === "file" ? "bg-gradient-to-r from-purple-600 to-blue-600" : ""}
                    >
                      Upload File
                    </Button>
                  </div>

                  {uploadMethod === "url" ? (
                    <div className="space-y-2">
                      <Input
                        id="imageUrl"
                        name="imageUrl"
                        type="url"
                        placeholder="https://example.com/event-image.jpg"
                        value={imageUrl}
                        onChange={(e) => {
                          setImageUrl(e.target.value);
                          setImagePreview(e.target.value);
                        }}
                        className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Paste an image URL from Imgur, Cloudinary, or any image host
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <label 
                          htmlFor="imageFile"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 hover:border-purple-400 dark:hover:border-purple-600 transition-colors">
                            <div className="flex flex-col items-center gap-2 text-center">
                              <ImageIcon className="h-10 w-10 text-slate-400" />
                              <div className="text-sm font-medium">
                                {imageFile ? imageFile.name : "Click to upload image"}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">
                                PNG, JPG, GIF up to 5MB
                              </div>
                            </div>
                          </div>
                        </label>
                        <Input
                          id="imageFile"
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="hidden"
                        />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Upload an image from your device
                      </p>
                    </div>
                  )}

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="relative mt-3 rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700">
                      <img 
                        src={imagePreview} 
                        alt="Event preview" 
                        className="w-full h-48 object-cover"
                        onError={() => {
                          setImagePreview("");
                          if (uploadMethod === "url") setImageUrl("");
                        }}
                      />
                      <button
                        title="removeimage"
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                          Preview
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold">
                    Tags (Optional)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                      placeholder="e.g., networking, tech, career"
                      className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                    <Button 
                      type="button" 
                      onClick={handleAddTag}
                      variant="outline"
                      className="border-2 border-slate-300 dark:border-slate-700 rounded-xl"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags.map((tag) => (
                        <span 
                          key={tag}
                          className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tag}
                          <button
                            title = "removetag"
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Add tags to help students discover your event
                  </p>
                </div>

                {/* Registration Link */}
                <div className="space-y-2">
                  <Label htmlFor="registrationUrl" className="text-base font-semibold">
                    Registration/RSVP Link (Optional)
                  </Label>
                  <Input
                    id="registrationUrl"
                    name="registrationUrl"
                    type="url"
                    placeholder="https://forms.google.com/..."
                    className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Add a Google Form, Eventbrite, or any registration link
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-base font-semibold">
                    Contact Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    placeholder="youremail@example.com"
                    required
                    className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Students can contact you for questions about the event
                  </p>
                </div>

                {/* Info Box */}
                <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm mb-1">Quick Tips for a Great Event Listing</h4>
                        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                          <li>✓ Use a clear, descriptive title</li>
                          <li>✓ Add a high-quality cover image</li>
                          <li>✓ Be specific about location and time</li>
                          <li>✓ Include what attendees will gain</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl h-12 text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5 mr-2" />
                        Publish Event
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold rounded-xl h-12 px-6"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </section>
    </main>
  );
}