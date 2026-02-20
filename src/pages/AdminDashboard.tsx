import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, BarChart3, MapPin, AlertTriangle, Brain, FileText, MessageSquare,
  TrendingUp, Users, Clock, CheckCircle2, Zap, LogOut, Bell, Settings,
  Home, Layers, Mail, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area,
} from "recharts";

const categoryData = [
  { name: "Road", value: 342, fill: "hsl(199, 89%, 48%)" },
  { name: "Water", value: 218, fill: "hsl(168, 76%, 42%)" },
  { name: "Garbage", value: 189, fill: "hsl(38, 92%, 50%)" },
  { name: "Streetlight", value: 124, fill: "hsl(217, 71%, 53%)" },
  { name: "Drainage", value: 97, fill: "hsl(152, 69%, 40%)" },
  { name: "Noise", value: 56, fill: "hsl(0, 72%, 51%)" },
];

const trendData = [
  { day: "Mon", complaints: 32, resolved: 28 },
  { day: "Tue", complaints: 45, resolved: 35 },
  { day: "Wed", complaints: 38, resolved: 42 },
  { day: "Thu", complaints: 52, resolved: 40 },
  { day: "Fri", complaints: 48, resolved: 45 },
  { day: "Sat", complaints: 28, resolved: 30 },
  { day: "Sun", complaints: 18, resolved: 22 },
];

const sentimentData = [
  { name: "Positive", value: 25, fill: "hsl(152, 69%, 40%)" },
  { name: "Neutral", value: 40, fill: "hsl(199, 89%, 48%)" },
  { name: "Negative", value: 35, fill: "hsl(0, 72%, 51%)" },
];

const recentComplaints = [
  { id: "CIV-1024", citizen: "Rahul S.", category: "Road", summary: "Large pothole on MG Road", urgency: "High", sentiment: "Negative", status: "Open" },
  { id: "CIV-1023", citizen: "Priya M.", category: "Water", summary: "Water leakage Block C", urgency: "Medium", sentiment: "Negative", status: "Assigned" },
  { id: "CIV-1022", citizen: "Amit K.", category: "Garbage", summary: "Overflowing bin sector 5", urgency: "High", sentiment: "Negative", status: "Open" },
  { id: "CIV-1021", citizen: "Neha P.", category: "Streetlight", summary: "Broken light near park", urgency: "Low", sentiment: "Neutral", status: "Resolved" },
  { id: "CIV-1020", citizen: "Vikash R.", category: "Drainage", summary: "Clogged drain lane 4", urgency: "Medium", sentiment: "Negative", status: "Assigned" },
];

const urgencyColor: Record<string, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Low: "bg-muted text-muted-foreground border-border",
};

const statusColor: Record<string, string> = {
  Open: "bg-info/10 text-info border-info/20",
  Assigned: "bg-warning/10 text-warning border-warning/20",
  Resolved: "bg-success/10 text-success border-success/20",
};

const navItems = [
  { icon: Home, label: "Overview", value: "overview" },
  { icon: BarChart3, label: "Analytics", value: "analytics" },
  { icon: MapPin, label: "Geo View", value: "geo" },
  { icon: AlertTriangle, label: "Escalations", value: "escalations" },
  { icon: Brain, label: "AI Insights", value: "insights" },
  { icon: FileText, label: "Reports", value: "reports" },
  { icon: Mail, label: "Communications", value: "comms" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border hidden lg:flex flex-col">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground">CivicHelp Admin</span>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setActiveTab(item.value)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.value
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <Link to="/">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden bg-card border-b border-border p-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground text-sm">Admin</span>
        </div>
      </div>

      {/* Main */}
      <main className="lg:ml-64 p-4 md:p-6 lg:p-8">
        {/* Mobile nav */}
        <div className="lg:hidden mb-6 overflow-x-auto">
          <div className="flex gap-2">
            {navItems.slice(0, 5).map(t => (
              <Button key={t.value} size="sm" variant={activeTab === t.value ? "default" : "outline"} onClick={() => setActiveTab(t.value)} className={activeTab === t.value ? "gradient-primary text-primary-foreground" : ""}>
                {t.label}
              </Button>
            ))}
          </div>
        </div>

        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
        {activeTab === "escalations" && <EscalationsTab />}
        {activeTab === "insights" && <InsightsTab />}
        {activeTab === "reports" && <ReportsTab />}
        {activeTab === "comms" && <CommsTab />}
        {activeTab === "geo" && <GeoTab />}
      </main>
    </div>
  );
};

const OverviewTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">Real-time civic intelligence • Feb 20, 2026</p>
      </div>
      <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" /> Export</Button>
    </div>

    {/* KPI cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Total Complaints", value: "1,026", change: "+12%", icon: FileText, color: "text-primary" },
        { label: "Pending", value: "234", change: "-3%", icon: Clock, color: "text-warning" },
        { label: "Resolved Today", value: "47", change: "+18%", icon: CheckCircle2, color: "text-success" },
        { label: "Urgent", value: "18", change: "+5", icon: AlertTriangle, color: "text-destructive" },
      ].map((kpi) => (
        <Card key={kpi.label} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              <span className="text-xs font-medium text-success">{kpi.change}</span>
            </div>
            <div className="text-2xl font-display font-bold text-foreground">{kpi.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{kpi.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Charts row */}
    <div className="grid lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display">Weekly Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 22%, 88%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 48%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 48%)" />
                <Tooltip />
                <Area type="monotone" dataKey="complaints" stroke="hsl(199, 89%, 48%)" fill="hsl(199, 89%, 48%)" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="resolved" stroke="hsl(152, 69%, 40%)" fill="hsl(152, 69%, 40%)" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display">By Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                  {categoryData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {categoryData.slice(0, 4).map(c => (
              <div key={c.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ background: c.fill }} />
                <span className="text-muted-foreground">{c.name}</span>
                <span className="font-medium text-foreground ml-auto">{c.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Recent complaints table */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-display">Recent Complaints</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-muted-foreground font-medium">ID</th>
                <th className="text-left py-2 text-muted-foreground font-medium">Citizen</th>
                <th className="text-left py-2 text-muted-foreground font-medium hidden md:table-cell">Category</th>
                <th className="text-left py-2 text-muted-foreground font-medium">Summary</th>
                <th className="text-left py-2 text-muted-foreground font-medium">Urgency</th>
                <th className="text-left py-2 text-muted-foreground font-medium hidden sm:table-cell">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentComplaints.map(c => (
                <tr key={c.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-2.5 font-mono text-xs text-muted-foreground">{c.id}</td>
                  <td className="py-2.5 text-foreground">{c.citizen}</td>
                  <td className="py-2.5 hidden md:table-cell text-foreground">{c.category}</td>
                  <td className="py-2.5 max-w-[200px] truncate text-foreground">{c.summary}</td>
                  <td className="py-2.5"><Badge variant="outline" className={urgencyColor[c.urgency]}>{c.urgency}</Badge></td>
                  <td className="py-2.5 hidden sm:table-cell"><Badge variant="outline" className={statusColor[c.status]}>{c.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const AnalyticsTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <h1 className="text-2xl font-display font-bold text-foreground">Analytics</h1>

    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base font-display">Complaints by Category</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 22%, 88%)" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 48%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 48%)" />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {categoryData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base font-display">Sentiment Distribution</CardTitle></CardHeader>
        <CardContent>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sentimentData} cx="50%" cy="50%" outerRadius={80} paddingAngle={3} dataKey="value" label>
                  {sentimentData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  </motion.div>
);

const EscalationsTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <h1 className="text-2xl font-display font-bold text-foreground">Emergency Escalations</h1>
    <div className="space-y-4">
      {[
        { id: "ESC-001", complaint: "CIV-1024", reason: "Strong negative sentiment + safety keyword (accident)", action: "Auto-flagged, Escalation email drafted to Road Dept.", time: "2 min ago" },
        { id: "ESC-002", complaint: "CIV-1022", reason: "Sudden spike: 12 garbage complaints in Zone 5 (last 2 hrs)", action: "Bulk alert generated for Sanitation Dept.", time: "15 min ago" },
      ].map(e => (
        <Card key={e.id} className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <span className="font-mono text-xs text-destructive font-bold">{e.id}</span>
              <span className="text-xs text-muted-foreground ml-auto">{e.time}</span>
            </div>
            <p className="text-sm font-medium text-foreground mb-1">{e.reason}</p>
            <p className="text-xs text-muted-foreground">{e.action}</p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="destructive">View & Act</Button>
              <Button size="sm" variant="outline">Dismiss</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </motion.div>
);

const InsightsTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <h1 className="text-2xl font-display font-bold text-foreground">AI Predictive Insights</h1>

    <div className="grid md:grid-cols-2 gap-4">
      {[
        { icon: TrendingUp, title: "Garbage Spike Predicted", desc: "Zone 4 likely to see 40% increase in garbage complaints next week based on seasonal patterns and current trajectory.", type: "prediction" },
        { icon: Layers, title: "Water Cluster Detected", desc: "Ward 12 shows recurring water leakage complaints near schools — suggests aging underground infrastructure.", type: "geo-narrative" },
        { icon: Brain, title: "Sentiment Shift", desc: "Citizen sentiment in Zone 2 shifted from neutral to negative over last 3 days. Primary driver: unresolved drainage complaints.", type: "sentiment" },
        { icon: Zap, title: "Resolution Recommendation", desc: "Deploying 2 additional road crews to Sector 7 could reduce backlog by 60% within 48 hours.", type: "action" },
      ].map(ins => (
        <Card key={ins.title} className="hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <ins.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">{ins.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{ins.desc}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </motion.div>
);

const ReportsTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-display font-bold text-foreground">Governance Reports</h1>
      <Button className="gradient-primary text-primary-foreground"><FileText className="w-4 h-4 mr-2" /> Generate Today's Report</Button>
    </div>

    <Card>
      <CardHeader><CardTitle className="text-base font-display">Daily Report Preview — Feb 20, 2026</CardTitle></CardHeader>
      <CardContent className="space-y-4 text-sm text-foreground">
        <div>
          <h4 className="font-semibold mb-1">🔴 Top 5 Urgent Issues</h4>
          <ol className="list-decimal list-inside text-muted-foreground space-y-1">
            <li>Large pothole MG Road — 23 reports, 3 accidents</li>
            <li>Water contamination Block C — health hazard flagged</li>
            <li>Overflowing bins Sector 5 market — 12 reports today</li>
            <li>Broken streetlight near school Zone 3</li>
            <li>Drainage backup Lane 4 — flooding risk</li>
          </ol>
        </div>
        <div>
          <h4 className="font-semibold mb-1">📊 Sentiment Overview</h4>
          <p className="text-muted-foreground">Overall negative sentiment at 35% — driven by road and water complaints. Recommended immediate action on MG Road pothole cluster.</p>
        </div>
        <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export as PDF</Button>
      </CardContent>
    </Card>
  </motion.div>
);

const CommsTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <h1 className="text-2xl font-display font-bold text-foreground">Public Communications</h1>

    <Card>
      <CardHeader><CardTitle className="text-base font-display">AI Communication Generator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <Button className="gradient-primary text-primary-foreground"><Zap className="w-4 h-4 mr-2" /> Generate Public Update</Button>

        <div className="space-y-3 mt-4">
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="text-xs text-muted-foreground mb-1">📱 Social Media Post</div>
            <p className="text-sm text-foreground">🚧 Road repair underway on MG Road. Expect minor diversions until Feb 22. Your safety is our priority! #SmartCity #CivicHelp</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="text-xs text-muted-foreground mb-1">💬 SMS Content</div>
            <p className="text-sm text-foreground">CivicHelp: Water supply maintenance scheduled Feb 21, 9AM-1PM, Zone 4. Please store water in advance.</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="text-xs text-muted-foreground mb-1">🌐 Multilingual Notice (Hindi)</div>
            <p className="text-sm text-foreground">सूचना: MG रोड पर सड़क मरम्मत कार्य जारी है। 22 फरवरी तक मामूली डायवर्शन की उम्मीद करें।</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const GeoTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <h1 className="text-2xl font-display font-bold text-foreground">Geo Intelligence View</h1>
    <Card>
      <CardContent className="p-0">
        <div className="h-[500px] bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
          {/* Placeholder map - will be replaced with Leaflet when Cloud is enabled */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="text-center z-10 p-6">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-3" />
            <h3 className="font-display font-semibold text-foreground text-lg">Interactive Map View</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              Heatmap visualization with AI-generated geo-narratives. Enable Cloud to activate real-time complaint mapping.
            </p>
          </div>
          {/* Decorative dots to simulate map points */}
          {[
            { top: "20%", left: "30%", size: "w-4 h-4", color: "bg-destructive" },
            { top: "35%", left: "55%", size: "w-3 h-3", color: "bg-warning" },
            { top: "60%", left: "40%", size: "w-5 h-5", color: "bg-destructive" },
            { top: "45%", left: "70%", size: "w-3 h-3", color: "bg-primary" },
            { top: "70%", left: "25%", size: "w-3 h-3", color: "bg-warning" },
            { top: "25%", left: "75%", size: "w-4 h-4", color: "bg-success" },
          ].map((dot, i) => (
            <div
              key={i}
              className={`absolute ${dot.size} ${dot.color} rounded-full opacity-40 animate-pulse`}
              style={{ top: dot.top, left: dot.left }}
            />
          ))}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle className="text-base font-display">AI Geo-Narrative</CardTitle></CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          "Ward 12 shows recurring water leakage near schools indicating aging infrastructure.
          Zone 4 garbage complaints cluster around the main market area — highest density between 6-9 AM.
          MG Road pothole reports form a 500m corridor suggesting systemic road surface failure."
        </p>
      </CardContent>
    </Card>
  </motion.div>
);

export default AdminDashboard;
