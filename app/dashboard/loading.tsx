export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/10">
      <div className="container mx-auto px-6 py-8">
        <div className="animate-pulse space-y-8">
          {/* Header skeleton */}
          <div className="h-8 bg-muted rounded w-1/3"></div>

          {/* Stats cards skeleton */}
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded-lg"></div>
            ))}
          </div>

          {/* Content skeleton */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="h-64 bg-muted rounded-lg"></div>
            <div className="h-64 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
