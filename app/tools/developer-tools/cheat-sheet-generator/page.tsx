"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, Search, Terminal, Code, Box, Palette } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Command {
  command: string
  description: string
  category: string
}

const cheatSheets: Record<string, Command[]> = {
  git: [
    { command: "git init", description: "Initialize a new Git repository", category: "Setup" },
    { command: "git clone <url>", description: "Clone a repository from URL", category: "Setup" },
    { command: "git status", description: "Check status of working directory", category: "Basic" },
    { command: "git add <file>", description: "Add file to staging area", category: "Basic" },
    { command: "git add .", description: "Add all changes to staging", category: "Basic" },
    { command: "git commit -m 'message'", description: "Commit staged changes", category: "Basic" },
    { command: "git push origin <branch>", description: "Push commits to remote", category: "Basic" },
    { command: "git pull", description: "Fetch and merge remote changes", category: "Basic" },
    { command: "git branch", description: "List all branches", category: "Branching" },
    { command: "git branch <name>", description: "Create new branch", category: "Branching" },
    { command: "git checkout <branch>", description: "Switch to branch", category: "Branching" },
    { command: "git checkout -b <branch>", description: "Create and switch to new branch", category: "Branching" },
    { command: "git merge <branch>", description: "Merge branch into current", category: "Branching" },
    { command: "git log", description: "View commit history", category: "History" },
    { command: "git diff", description: "Show changes between commits", category: "History" },
    { command: "git reset --hard", description: "Reset to last commit", category: "Advanced" },
    { command: "git stash", description: "Temporarily save changes", category: "Advanced" },
    { command: "git stash pop", description: "Restore stashed changes", category: "Advanced" },
  ],
  docker: [
    { command: "docker ps", description: "List running containers", category: "Containers" },
    { command: "docker ps -a", description: "List all containers", category: "Containers" },
    { command: "docker run <image>", description: "Run a container from image", category: "Containers" },
    { command: "docker run -d <image>", description: "Run container in background", category: "Containers" },
    { command: "docker stop <container>", description: "Stop running container", category: "Containers" },
    { command: "docker rm <container>", description: "Remove container", category: "Containers" },
    { command: "docker images", description: "List all images", category: "Images" },
    { command: "docker pull <image>", description: "Download image from registry", category: "Images" },
    { command: "docker build -t <name> .", description: "Build image from Dockerfile", category: "Images" },
    { command: "docker rmi <image>", description: "Remove image", category: "Images" },
    { command: "docker exec -it <container> bash", description: "Enter container shell", category: "Debug" },
    { command: "docker logs <container>", description: "View container logs", category: "Debug" },
    { command: "docker-compose up", description: "Start services from compose file", category: "Compose" },
    { command: "docker-compose down", description: "Stop and remove containers", category: "Compose" },
  ],
  tailwind: [
    { command: "p-4", description: "Padding: 1rem (16px)", category: "Spacing" },
    { command: "m-4", description: "Margin: 1rem (16px)", category: "Spacing" },
    { command: "px-4", description: "Horizontal padding", category: "Spacing" },
    { command: "py-4", description: "Vertical padding", category: "Spacing" },
    { command: "flex", description: "Display: flex", category: "Flexbox" },
    { command: "flex-col", description: "Flex direction: column", category: "Flexbox" },
    { command: "justify-center", description: "Justify content: center", category: "Flexbox" },
    { command: "items-center", description: "Align items: center", category: "Flexbox" },
    { command: "gap-4", description: "Gap: 1rem", category: "Flexbox" },
    { command: "grid", description: "Display: grid", category: "Grid" },
    { command: "grid-cols-3", description: "3 equal columns", category: "Grid" },
    { command: "text-center", description: "Text align: center", category: "Typography" },
    { command: "text-xl", description: "Font size: 1.25rem", category: "Typography" },
    { command: "font-bold", description: "Font weight: 700", category: "Typography" },
    { command: "bg-blue-500", description: "Background color blue", category: "Colors" },
    { command: "text-white", description: "Text color white", category: "Colors" },
    { command: "rounded-lg", description: "Border radius: 0.5rem", category: "Borders" },
    { command: "shadow-lg", description: "Box shadow large", category: "Effects" },
  ],
  npm: [
    { command: "npm init", description: "Initialize new package.json", category: "Setup" },
    { command: "npm install", description: "Install all dependencies", category: "Packages" },
    { command: "npm install <package>", description: "Install specific package", category: "Packages" },
    { command: "npm install -D <package>", description: "Install as dev dependency", category: "Packages" },
    { command: "npm uninstall <package>", description: "Remove package", category: "Packages" },
    { command: "npm update", description: "Update all packages", category: "Packages" },
    { command: "npm run <script>", description: "Run package.json script", category: "Scripts" },
    { command: "npm test", description: "Run test script", category: "Scripts" },
    { command: "npm start", description: "Run start script", category: "Scripts" },
    { command: "npm publish", description: "Publish package to registry", category: "Publishing" },
  ],
}

export default function CheatSheetGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string>("git")
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)
  const { toast } = useToast()

  const filteredCommands = cheatSheets[selectedCategory].filter(
    (cmd) =>
      cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const copyToClipboard = (command: string) => {
    navigator.clipboard.writeText(command)
    setCopiedCommand(command)
    toast({
      title: "Copied!",
      description: "Command copied to clipboard",
    })
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  const categoryIcons: Record<string, any> = {
    git: Terminal,
    docker: Box,
    tailwind: Palette,
    npm: Code,
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b bg-gradient-to-br from-blue-500 to-cyan-500 py-16 text-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="container relative">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-white/20 text-white backdrop-blur-sm">
                Developer Tools
              </Badge>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Cheat Sheet Generator
              </h1>
              <p className="text-lg text-white/90">
                Quick reference for common commands. Search, copy, and boost your productivity.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-6xl">
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search commands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-lg"
                />
              </div>
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
                {Object.keys(cheatSheets).map((category) => {
                  const Icon = categoryIcons[category]
                  return (
                    <TabsTrigger key={category} value={category} className="capitalize">
                      <Icon className="mr-2 h-4 w-4" />
                      {category}
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {Object.keys(cheatSheets).map((category) => (
                <TabsContent key={category} value={category} className="mt-6">
                  {filteredCommands.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">No commands found matching your search</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      {filteredCommands.map((cmd, index) => (
                        <Card key={index} className="group transition-all hover:shadow-md">
                          <CardHeader>
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <Badge variant="outline" className="mb-2">
                                  {cmd.category}
                                </Badge>
                                <CardTitle className="font-mono text-sm">
                                  {cmd.command}
                                </CardTitle>
                                <CardDescription className="mt-2">
                                  {cmd.description}
                                </CardDescription>
                              </div>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => copyToClipboard(cmd.command)}
                                className="shrink-0"
                              >
                                {copiedCommand === cmd.command ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>

            <Card className="mt-12 border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
              <CardHeader>
                <CardTitle>About Cheat Sheet Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  This searchable cheat sheet provides quick access to commonly used commands for Git,
                  Docker, Tailwind CSS, and npm. Perfect for developers who want a fast reference without
                  leaving their workflow.
                </p>
                <p>
                  Simply search for what you need, click to copy any command, and paste it into your terminal
                  or code editor. All commands are categorized for easy navigation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
