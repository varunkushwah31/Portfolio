const Footer = () => {
  return (
    <footer className="border-t py-10 text-center text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} Your Name</p>
      <p className="mt-2">Built with React, TypeScript & Tailwind</p>
    </footer>
  )
}

export default Footer
