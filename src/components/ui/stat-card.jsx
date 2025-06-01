import { Card, CardHeader, CardTitle, CardContent } from './card'
import { FileText, Users, Activity, Percent } from 'lucide-react'

const icons = {
  form: FileText,
  response: Users,
  active: Activity,
  rate: Percent
}

export function StatCard({ title, value, icon }) {
  const Icon = icons[icon]
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
