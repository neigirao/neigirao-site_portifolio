export function FooterSection() {
  return (
    <footer className="py-8 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-muted-foreground">© {new Date().getFullYear()} Nei Girão. All rights reserved.</p>
      </div>
    </footer>
  );
}
