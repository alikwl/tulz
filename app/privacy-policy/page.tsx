import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy for Tulz.net - Learn how we protect your data and respect your privacy.',
}

export default function PrivacyPolicy() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12">
                <div className="container max-w-4xl">
                    <h1 className="mb-8 text-4xl font-bold tracking-tight">Privacy Policy</h1>
                    <p className="mb-6 text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Introduction</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p>
                                    At Tulz.net, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Data Collection</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p>
                                    <strong>Information We Collect:</strong>
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Usage Data:</strong> We collect anonymous analytics data via Google Analytics to understand how visitors use our site (pages viewed, time spent, browser type, etc.)</li>
                                    <li><strong>Files You Upload:</strong> All files you upload to our tools are processed entirely in your browser. We do NOT store, transmit, or have access to any files you process.</li>
                                    <li><strong>Cookies:</strong> We use cookies for analytics and to remember your preferences (e.g., dark mode)</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>How We Use Your Data</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>To improve our website and user experience</li>
                                    <li>To analyze website traffic and usage patterns</li>
                                    <li>To remember your preferences across visits</li>
                                </ul>
                                <p className="mt-4">
                                    <strong>We do NOT:</strong>
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Sell your data to third parties</li>
                                    <li>Store any files you upload or process</li>
                                    <li>Track you across other websites</li>
                                    <li>Collect personally identifiable information without your consent</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Client-Side Processing</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    All our tools process your data <strong>locally in your browser</strong>. This means:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Your files never leave your device</li>
                                    <li>Processing happens on your computer, not our servers</li>
                                    <li>Maximum privacy and data security</li>
                                    <li>Faster processing with no upload/download delays</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Third-Party Services</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>We use the following third-party services:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li><strong>Google Analytics:</strong> For anonymous usage statistics</li>
                                    <li><strong>Vercel:</strong> For website hosting and CDN</li>
                                </ul>
                                <p className="mt-4">
                                    These services may collect data according to their own privacy policies.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Your Rights</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>You have the right to:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Opt out of analytics tracking (use browser Do Not Track or ad blockers)</li>
                                    <li>Clear your cookies and browser storage at any time</li>
                                    <li>Request information about data we have collected</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Changes to This Policy</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Us</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    If you have any questions about this Privacy Policy, please contact us via our{' '}
                                    <a href="/contact" className="text-primary hover:underline">
                                        Contact page
                                    </a>.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
