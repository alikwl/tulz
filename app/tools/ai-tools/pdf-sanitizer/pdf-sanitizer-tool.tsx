import dynamic from 'next/dynamic'

const PDFSanitizerTool = dynamic(() => import('./pdf-sanitizer-tool'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-pulse">Loading PDF Sanitizer...</div>
    </div>
  ),
})

export default function PDFSanitizerPage() {
  return <PDFSanitizerTool />
}

export const metadata = {
  title: 'PDF Metadata Remover - Sanitize Your Documents | Tulz.net',
  description: 'Remove all metadata from PDF files including author, creation date, and sensitive information. 100% browser-based and private.',
}
