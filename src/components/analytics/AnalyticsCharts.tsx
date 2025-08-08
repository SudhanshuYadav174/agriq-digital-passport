import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Package, CheckCircle, Clock, BarChart3, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const AnalyticsCharts = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalBatches: 195,
    certified: 156,
    pending: 23,
    successRate: 92.3,
    productTypes: [
      { type: 'Rice', count: 45, percentage: 23 },
      { type: 'Wheat', count: 32, percentage: 16 },
      { type: 'Quinoa', count: 28, percentage: 14 },
      { type: 'Barley', count: 18, percentage: 9 },
      { type: 'Corn', count: 22, percentage: 11 },
    ],
    recentActivity: [
      { date: '2025-01-08', batches: 12, certified: 10 },
      { date: '2025-01-07', batches: 8, certified: 7 },
      { date: '2025-01-06', batches: 15, certified: 13 },
      { date: '2025-01-05', batches: 6, certified: 5 },
      { date: '2025-01-04', batches: 9, certified: 8 },
    ]
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyticsData(prev => ({
        ...prev,
        totalBatches: prev.totalBatches + Math.floor(Math.random() * 2),
        certified: prev.certified + Math.floor(Math.random() * 2),
        pending: Math.max(0, prev.pending + Math.floor(Math.random() * 3) - 1),
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Total Batches", value: analyticsData.totalBatches.toString(), icon: Package, change: "+12.5%" },
          { title: "Certified", value: analyticsData.certified.toString(), icon: CheckCircle, change: "+18.2%" },
          { title: "Pending", value: analyticsData.pending.toString(), icon: Clock, change: "+3.1%" },
          { title: "Success Rate", value: `${analyticsData.successRate}%`, icon: TrendingUp, change: "+2.4%" }
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-xs text-success">{metric.change}</p>
                  </div>
                  <Icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Product Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Product Type Distribution</CardTitle>
            <CardDescription>Breakdown of batches by product type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.productTypes.map((product, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{product.type}</span>
                  <span className="text-muted-foreground">{product.count} batches</span>
                </div>
                <Progress value={product.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Last 5 days batch processing activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.recentActivity.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{day.date}</div>
                      <div className="text-xs text-muted-foreground">
                        {day.batches} submitted, {day.certified} certified
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-success">
                      {Math.round((day.certified / day.batches) * 100)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Success rate</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Performance Overview</span>
            </CardTitle>
            <CardDescription>Key performance indicators and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">
                  {((analyticsData.certified / analyticsData.totalBatches) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Overall Success Rate</div>
                <Progress value={(analyticsData.certified / analyticsData.totalBatches) * 100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-secondary">
                  {Math.round(analyticsData.totalBatches / 30)}
                </div>
                <div className="text-sm text-muted-foreground">Avg. Daily Submissions</div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-success">
                  {analyticsData.pending < 30 ? 'Excellent' : 'Good'}
                </div>
                <div className="text-sm text-muted-foreground">Processing Speed</div>
                <Progress value={analyticsData.pending < 30 ? 90 : 70} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsCharts;