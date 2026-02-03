const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

function getAllMDXFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      getAllMDXFiles(filePath, fileList)
    } else if (file.endsWith('.mdx')) {
      fileList.push(filePath)
    }
  })

  return fileList
}

function generateSearchIndex() {
  const searchIndex = []

  // Index blog posts
  const postsDir = path.join(process.cwd(), 'content/posts')
  if (fs.existsSync(postsDir)) {
    const mdxFiles = getAllMDXFiles(postsDir)

    mdxFiles.forEach(filePath => {
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)

      const relativePath = path.relative(postsDir, filePath)
      const category = path.dirname(relativePath)
      const slug = path.basename(filePath, '.mdx')

      searchIndex.push({
        id: `blog-${category}-${slug}`,
        type: 'blog',
        title: data.title || '',
        description: data.description || '',
        category: data.category || category,
        tags: data.keywords || [],
        url: `/blog/${category}/${slug}`,
        content: content.substring(0, 500),
        author: data.author || 'Tulz Team',
        date: data.date || '',
      })
    })
  }

  // Index tools
  const toolsDataPath = path.join(process.cwd(), 'lib/tools-data.ts')
  if (fs.existsSync(toolsDataPath)) {
    const toolsData = fs.readFileSync(toolsDataPath, 'utf8')

    // Extract tools array using regex (simple approach)
    const toolsMatch = toolsData.match(/export const tools(?::\s*Tool\[\])?\s*=\s*\[([\s\S]*?)\n\]/);

    if (toolsMatch) {
      // Parse tool objects (this is a simplified parser)
      const toolsContent = toolsMatch[1]
      const toolMatches = toolsContent.match(/\{[\s\S]*?\n  \}/g)

      if (toolMatches) {
        toolMatches.forEach((toolStr, index) => {
          try {
            const nameMatch = toolStr.match(/name:\s*["']([^"']+)["']/)
            const descMatch = toolStr.match(/description:\s*["']([^"']+)["']/)
            const hrefMatch = toolStr.match(/href:\s*["']([^"']+)["']/)
            const categoryMatch = toolStr.match(/category:\s*["']([^"']+)["']/)

            if (nameMatch && descMatch && hrefMatch) {
              searchIndex.push({
                id: `tool-${index}`,
                type: 'tool',
                title: nameMatch[1],
                description: descMatch[1],
                category: categoryMatch ? categoryMatch[1] : 'Tools',
                tags: [],
                url: hrefMatch[1],
                content: descMatch[1],
              })
            }
          } catch (e) {
            console.error('Error parsing tool:', e)
          }
        })
      }
    }
  }

  // Write search index
  const outputPath = path.join(process.cwd(), 'public/search-index.json')
  fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2))

  console.log(`✅ Search index generated with ${searchIndex.length} items`)
  console.log(`📝 Output: public/search-index.json`)
}

try {
  generateSearchIndex()
} catch (error) {
  console.error('❌ Error generating search index:', error)
  process.exit(1)
}
