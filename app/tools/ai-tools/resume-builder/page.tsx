"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  FileText,
  Download,
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Plus,
  Trash2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTrackToolUsage } from "@/hooks/use-track-tool-usage"

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

interface Education {
  id: string
  school: string
  degree: string
  field: string
  year: string
}

export default function ResumeBuilderPage() {
  useTrackToolUsage("ai-resume-builder")

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [summary, setSummary] = useState("")
  const [skills, setSkills] = useState("")

  const [experiences, setExperiences] = useState<Experience[]>([
    { id: "1", company: "", position: "", startDate: "", endDate: "", description: "" }
  ])

  const [education, setEducation] = useState<Education[]>([
    { id: "1", school: "", degree: "", field: "", year: "" }
  ])

  const [template, setTemplate] = useState("modern")
  const { toast } = useToast()

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { id: Date.now().toString(), company: "", position: "", startDate: "", endDate: "", description: "" }
    ])
  }

  const removeExperience = (id: string) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(exp => exp.id !== id))
    }
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ))
  }

  const addEducation = () => {
    setEducation([
      ...education,
      { id: Date.now().toString(), school: "", degree: "", field: "", year: "" }
    ])
  }

  const removeEducation = (id: string) => {
    if (education.length > 1) {
      setEducation(education.filter(edu => edu.id !== id))
    }
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    ))
  }

  const generateResume = () => {
    if (!fullName || !email) {
      toast({
        title: "Missing information",
        description: "Please fill in at least your name and email",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Resume generated!",
      description: "Your resume preview is ready below",
    })
  }

  const downloadResume = () => {
    toast({
      title: "Download started",
      description: "Your resume is being downloaded as PDF",
    })
  }

  const loadSampleData = () => {
    setFullName("John Smith")
    setEmail("john.smith@email.com")
    setPhone("(555) 123-4567")
    setLocation("New York, NY")
    setSummary("Experienced software engineer with 5+ years of expertise in full-stack development. Proven track record of delivering scalable web applications and leading cross-functional teams.")
    setSkills("JavaScript, React, Node.js, Python, SQL, AWS, Docker, Git")

    setExperiences([
      {
        id: "1",
        company: "Tech Corp",
        position: "Senior Software Engineer",
        startDate: "2020-01",
        endDate: "Present",
        description: "Led development of microservices architecture serving 1M+ users. Mentored junior developers and improved code quality through comprehensive code reviews."
      },
      {
        id: "2",
        company: "StartupXYZ",
        position: "Full Stack Developer",
        startDate: "2018-06",
        endDate: "2019-12",
        description: "Built responsive web applications using React and Node.js. Collaborated with designers to implement pixel-perfect UI components."
      }
    ])

    setEducation([
      {
        id: "1",
        school: "State University",
        degree: "Bachelor of Science",
        field: "Computer Science",
        year: "2018"
      }
    ])

    toast({
      title: "Sample data loaded",
      description: "You can now edit or generate your resume",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b bg-gradient-to-b from-muted/50 to-background py-12">
          <div className="container">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/tools">Tools</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/tools/ai-tools">AI Tools</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbPage>AI Resume Builder</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10">
                    <FileText className="h-6 w-6 text-indigo-500" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight">AI Resume Builder</h1>
                    <p className="text-muted-foreground">
                      Create professional, ATS-friendly resumes in minutes
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Badge variant="secondary" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    New
                  </Badge>
                  <Badge variant="outline">Free Forever</Badge>
                  <Badge variant="outline">ATS-Optimized</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-6xl">
            <div className="flex justify-end mb-6">
              <Button onClick={loadSampleData} variant="outline">
                <Sparkles className="mr-2 h-4 w-4" />
                Load Sample Data
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-5">
              <div className="lg:col-span-3 space-y-6">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Basic contact details and professional summary</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input
                              id="fullName"
                              placeholder="John Smith"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="john@email.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              placeholder="(555) 123-4567"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              placeholder="New York, NY"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="summary">Professional Summary</Label>
                          <Textarea
                            id="summary"
                            placeholder="Brief overview of your professional background and key qualifications..."
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            className="min-h-[120px]"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-4 mt-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Work Experience</CardTitle>
                            <CardDescription>Your professional work history</CardDescription>
                          </div>
                          <Button onClick={addExperience} size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Add
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {experiences.map((exp, index) => (
                          <div key={exp.id} className="space-y-4 p-4 rounded-lg border bg-muted/30">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">Experience {index + 1}</h3>
                              {experiences.length > 1 && (
                                <Button
                                  onClick={() => removeExperience(exp.id)}
                                  variant="ghost"
                                  size="sm"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label>Company</Label>
                                <Input
                                  placeholder="Company Name"
                                  value={exp.company}
                                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Position</Label>
                                <Input
                                  placeholder="Job Title"
                                  value={exp.position}
                                  onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input
                                  type="month"
                                  value={exp.startDate}
                                  onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input
                                  type="month"
                                  placeholder="Present"
                                  value={exp.endDate}
                                  onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Description</Label>
                              <Textarea
                                placeholder="Describe your responsibilities and achievements..."
                                value={exp.description}
                                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                                className="min-h-[100px]"
                              />
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="education" className="space-y-4 mt-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Education</CardTitle>
                            <CardDescription>Your academic background</CardDescription>
                          </div>
                          <Button onClick={addEducation} size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Add
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {education.map((edu, index) => (
                          <div key={edu.id} className="space-y-4 p-4 rounded-lg border bg-muted/30">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">Education {index + 1}</h3>
                              {education.length > 1 && (
                                <Button
                                  onClick={() => removeEducation(edu.id)}
                                  variant="ghost"
                                  size="sm"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label>School/University</Label>
                                <Input
                                  placeholder="University Name"
                                  value={edu.school}
                                  onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Degree</Label>
                                <Input
                                  placeholder="Bachelor of Science"
                                  value={edu.degree}
                                  onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Field of Study</Label>
                                <Input
                                  placeholder="Computer Science"
                                  value={edu.field}
                                  onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Year</Label>
                                <Input
                                  placeholder="2020"
                                  value={edu.year}
                                  onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-4 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Skills</CardTitle>
                        <CardDescription>List your key skills and competencies</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="skills">Skills (comma-separated)</Label>
                          <Textarea
                            id="skills"
                            placeholder="JavaScript, React, Node.js, Python, AWS, Docker..."
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            className="min-h-[150px]"
                          />
                          <p className="text-sm text-muted-foreground">
                            Separate each skill with a comma. Include both technical and soft skills.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle>Resume Preview</CardTitle>
                    <CardDescription>See how your resume looks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Template</Label>
                      <Select value={template} onValueChange={setTemplate}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="border rounded-lg p-6 bg-white dark:bg-slate-900 min-h-[500px] space-y-4">
                      {fullName && (
                        <>
                          <div className="text-center border-b pb-4">
                            <h2 className="text-2xl font-bold">{fullName}</h2>
                            <div className="text-sm text-muted-foreground mt-2 space-y-1">
                              {email && <div>{email}</div>}
                              {phone && <div>{phone}</div>}
                              {location && <div>{location}</div>}
                            </div>
                          </div>

                          {summary && (
                            <div>
                              <h3 className="font-semibold text-sm mb-2">PROFESSIONAL SUMMARY</h3>
                              <p className="text-sm text-muted-foreground">{summary}</p>
                            </div>
                          )}

                          {experiences.some(exp => exp.company) && (
                            <div>
                              <h3 className="font-semibold text-sm mb-2">EXPERIENCE</h3>
                              <div className="space-y-3">
                                {experiences.filter(exp => exp.company).map((exp) => (
                                  <div key={exp.id} className="text-sm">
                                    <div className="font-medium">{exp.position}</div>
                                    <div className="text-muted-foreground">{exp.company}</div>
                                    {exp.startDate && (
                                      <div className="text-xs text-muted-foreground">
                                        {exp.startDate} - {exp.endDate || "Present"}
                                      </div>
                                    )}
                                    {exp.description && (
                                      <p className="text-muted-foreground mt-1">{exp.description}</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {education.some(edu => edu.school) && (
                            <div>
                              <h3 className="font-semibold text-sm mb-2">EDUCATION</h3>
                              <div className="space-y-2">
                                {education.filter(edu => edu.school).map((edu) => (
                                  <div key={edu.id} className="text-sm">
                                    <div className="font-medium">{edu.degree} in {edu.field}</div>
                                    <div className="text-muted-foreground">{edu.school}</div>
                                    {edu.year && (
                                      <div className="text-xs text-muted-foreground">{edu.year}</div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {skills && (
                            <div>
                              <h3 className="font-semibold text-sm mb-2">SKILLS</h3>
                              <div className="flex flex-wrap gap-2">
                                {skills.split(",").map((skill, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {skill.trim()}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {!fullName && (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          <div className="text-center space-y-2">
                            <FileText className="h-12 w-12 mx-auto opacity-20" />
                            <p className="text-sm">Fill in your details to see preview</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={generateResume} className="flex-1">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate
                      </Button>
                      <Button onClick={downloadResume} variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-green-500 mb-2" />
                  <CardTitle>ATS-Friendly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Optimized format that passes Applicant Tracking Systems easily.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 text-yellow-500 mb-2" />
                  <CardTitle>Quick & Easy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Build your professional resume in minutes, not hours.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Sparkles className="h-8 w-8 text-purple-500 mb-2" />
                  <CardTitle>AI Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get AI-powered suggestions to improve your resume content.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is this resume builder really free?</AccordionTrigger>
                  <AccordionContent>
                    Yes, completely free with no hidden costs. Create, edit, and download your resume
                    as many times as you need without any subscription or payment.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>What is an ATS-friendly resume?</AccordionTrigger>
                  <AccordionContent>
                    ATS (Applicant Tracking System) friendly resumes are formatted to be easily read by
                    automated systems that many companies use to screen applications. Our templates are
                    optimized for ATS compatibility, increasing your chances of getting past initial
                    screening.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I edit my resume later?</AccordionTrigger>
                  <AccordionContent>
                    Your resume data is temporarily stored in your browser while you work on it. To save
                    permanently, download the PDF or copy your information. You can return anytime to
                    create a new resume with updated information.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>What format is the downloaded resume?</AccordionTrigger>
                  <AccordionContent>
                    Resumes are downloaded as PDF files, which is the preferred format for most job
                    applications. PDFs maintain formatting across all devices and are universally
                    accepted.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>How many templates are available?</AccordionTrigger>
                  <AccordionContent>
                    We currently offer 3 professional templates: Modern, Classic, and Minimal. Each
                    template is designed to be ATS-friendly and visually appealing to hiring managers.
                    More templates are being added regularly.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>Is my information secure?</AccordionTrigger>
                  <AccordionContent>
                    Yes, your privacy is our priority. All information is processed in your browser and
                    is not sent to our servers. We don't store, share, or use your personal information
                    for any purpose.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
