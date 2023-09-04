import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';

export function Widgets({ data }: any) {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-2'>
      {data.map((item: any) => (
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{item.value}</div>
            <p className='text-xs text-muted-foreground'>{item.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
