import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Terms of Service for Tulz.net - Read our terms and conditions for using our free online tools.',
}

export default function TermsOfService() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12">
                <div className="container max-w-4xl">
                    <h1 className="mb-8 text-4xl font-bold tracking-tight">Terms of Service</h1>
                    <p className="mb-6 text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>1. Acceptance of Terms</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    By accessing and using Tulz.net, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>2. Use License</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p>
                                    Permission is granted to temporarily use the tools on Tulz.net for personal or commercial purposes. This license shall automatically terminate if you violate any of these restrictions.
                                </p>
                                <p className="mt-4">
                                    <strong>You may NOT:</strong>
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Use our tools for any illegal or unauthorized purpose</li>
                                    <li>Attempt to circumvent any security measures</li>
                                    <li>Overload our servers with excessive requests (scraping, DDoS, etc.)</li>
                                    <li>Reverse engineer, decompile, or disassemble the software</li>
                                    <li>Use automated systems to access the service (except API where provided)</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>3. Free Service</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Tulz.net is provided free of charge. We reserve the right to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Modify or discontinue any tool without notice</li>
                                    <li>Implement usage limits or rate limiting</li>
                                    <li>Introduce premium features in the future</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>4. Disclaimer</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p>
                                    The tools on this website are provided "as is" without any representations or warranties, express or implied. Tulz.net makes no representations or warranties in relation to the tools or the information and materials provided.
                                </p>
                                <p>
                                    <strong>We do not warrant that:</strong>
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>The tools will always be available or uninterrupted</li>
                                    <li>The tools will be error-free or bug-free</li>
                                    <li>Results from the tools will be accurate or reliable</li>
                                    <li>Any errors or bugs will be corrected</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>5. Your Content</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    All files and data you process using our tools are processed <strong>locally in your browser</strong>. We do not:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Store your files on our servers</li>
                                    <li>Transmit your data to third parties</li>
                                    <li>Have access to any files you upload or process</li>
                                    <li>Retain any information about your files</li>
                                </ul>
                                <p className="mt-4">
                                    You retain all rights and ownership of your content. However, you are responsible for ensuring you have the right to process any content you use with our tools.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>6. Limitation of Liability</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Tulz.net will not be liable for any damages, including without limitation:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Loss of data or information</li>
                                    <li>Loss of revenue or profit</li>
                                    <li>Business interruption</li>
                                    <li>Any indirect, special, or consequential damages</li>
                                </ul>
                                <p className="mt-4">
                                    arising out of the use or inability to use the tools, even if we have been advised of the possibility of such damages.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>7. External Links</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Tulz.net may contain links to external websites. We have no control over the content and practices of these sites and cannot accept responsibility or liability for their content.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>8. Indemnification</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    You agree to indemnify Tulz.net and its affiliates against all claims, demands, and expenses arising from your use of the service or your violation of these Terms of Service.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>9. Changes to Terms</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    We reserve the right to revise these terms at any time. By using Tulz.net, you are agreeing to be bound by the current version of these Terms of Service. Please check this page regularly to ensure you are familiar with the current version.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>10. Governing Law</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    These terms shall be governed by and construed in accordance with applicable laws, without regard to its conflict of law provisions.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>11. Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    If you have any questions about these Terms of Service, please contact us via our{' '}
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
