import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, Plus, MessageSquare, Clock, CheckCircle2, AlertTriangle,
  Mic, Camera, Send, Home, FileText, Bell, LogOut, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockComplaints = [
  { id: "CIV-1024", category: "Road", summary: "Pothole on MG Road causing accidents", status: "In Progress", urgency: "High", date: "2026-02-19" },
  { id: "CIV-1023", category: "Water", summary: "Water leakage near Block C park", status: "Submitted", urgency: "Medium", date: "2026-02-18" },
  { id: "CIV-1020", category: "Garbage", summary: "Overflowing garbage bin at market", status: "Resolved", urgency: "Low", date: "2026-02-15" },
];

const statusColor: Record<string, string> = {
  Submitted: "bg-info/10 text-info border-info/20",
  "In Progress": "bg-warning/10 text-warning border-warning/20",
  Resolved: "bg-success/10 text-success border-success/20",
};

const urgencyColor: Record<string, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Low: "bg-muted text-muted-foreground border-border",
};

const CitizenDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border hidden lg:flex flex-col">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground">CivicHelp AI</span>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {[
            { icon: Home, label: "Dashboard", value: "dashboard" },
            { icon: Plus, label: "New Complaint", value: "new" },
            { icon: FileText, label: "My Complaints", value: "complaints" },
            { icon: MessageSquare, label: "AI Assistant", value: "chat" },
            { icon: Bell, label: "Updates", value: "updates" },
          ].map((item) => (
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
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">Rahul Sharma</div>
              <div className="text-xs text-muted-foreground">Citizen</div>
            </div>
          </div>
          <Link to="/">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground mt-1">
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden bg-card border-b border-border p-3 flex items-center gap-2 sticky top-0 z-30">
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-foreground text-sm">CivicHelp AI</span>
      </div>

      {/* Main content */}
      <main className="lg:ml-64 p-4 md:p-6 lg:p-8">
        {/* Mobile tabs */}
        <div className="lg:hidden mb-6 overflow-x-auto">
          <div className="flex gap-2">
            {["dashboard", "new", "complaints", "chat"].map(t => (
              <Button key={t} size="sm" variant={activeTab === t ? "default" : "outline"} onClick={() => setActiveTab(t)} className={activeTab === t ? "gradient-primary text-primary-foreground" : ""}>
                {t === "dashboard" ? "Home" : t === "new" ? "New" : t === "complaints" ? "My Complaints" : "AI Chat"}
              </Button>
            ))}
          </div>
        </div>

        {activeTab === "dashboard" && <DashboardView onNavigate={setActiveTab} />}
        {activeTab === "new" && <NewComplaintView />}
        {activeTab === "complaints" && <ComplaintsListView />}
        {activeTab === "chat" && <ChatView />}
        {activeTab === "updates" && <UpdatesView />}
      </main>
    </div>
  );
};

const DashboardView = ({ onNavigate }: { onNavigate: (tab: string) => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground">Welcome back, Rahul 👋</h1>
      <p className="text-muted-foreground text-sm mt-1">Here's an overview of your civic activity.</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: "Total Filed", value: "7", icon: FileText, color: "text-primary" },
        { label: "In Progress", value: "2", icon: Clock, color: "text-warning" },
        { label: "Resolved", value: "4", icon: CheckCircle2, color: "text-success" },
        { label: "Urgent", value: "1", icon: AlertTriangle, color: "text-destructive" },
      ].map((s) => (
        <Card key={s.label}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div className="text-2xl font-display font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>

    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-display">Recent Complaints</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockComplaints.map((c) => (
          <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">{c.id}</span>
                <Badge variant="outline" className={urgencyColor[c.urgency]}>{c.urgency}</Badge>
              </div>
              <p className="text-sm font-medium text-foreground mt-1 truncate">{c.summary}</p>
            </div>
            <Badge variant="outline" className={statusColor[c.status]}>{c.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>

    <Button onClick={() => onNavigate("new")} className="gradient-primary text-primary-foreground hover:opacity-90">
      <Plus className="w-4 h-4 mr-2" /> File New Complaint
    </Button>
  </motion.div>
);

const NewComplaintView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
    <h1 className="text-2xl font-display font-bold text-foreground mb-1">New Complaint</h1>
    <p className="text-sm text-muted-foreground mb-6">Describe the issue — use text, voice, or upload an image.</p>

    <Card>
      <CardContent className="p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input defaultValue="Rahul Sharma" readOnly className="bg-muted/50" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input defaultValue="+91 9876543210" readOnly className="bg-muted/50" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Input placeholder="e.g., Road, Water, Garbage, Streetlight" />
        </div>

        <div className="space-y-2">
          <Label>Complaint Details</Label>
          <Textarea placeholder="Describe the issue in detail..." rows={4} />
        </div>

        <div className="space-y-2">
          <Label>Exact Address to Fix</Label>
          <Input placeholder="e.g., Near Block C, MG Road, Ward 12" />
        </div>

        <div className="space-y-2">
          <Label>Date</Label>
          <Input type="date" />
        </div>

        {/* Voice / Image helpers */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            <Mic className="w-4 h-4 mr-2 text-primary" /> Voice Input
          </Button>
          <Button variant="outline" className="flex-1">
            <Camera className="w-4 h-4 mr-2 text-primary" /> Upload Image
          </Button>
        </div>

        <Button className="w-full gradient-primary text-primary-foreground hover:opacity-90">
          <Send className="w-4 h-4 mr-2" /> Submit Complaint
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

const ComplaintsListView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
    <h1 className="text-2xl font-display font-bold text-foreground">My Complaints</h1>
    {mockComplaints.map((c) => (
      <Card key={c.id}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-muted-foreground">{c.id}</span>
                <Badge variant="outline" className={urgencyColor[c.urgency]}>{c.urgency}</Badge>
                <Badge variant="outline" className={statusColor[c.status]}>{c.status}</Badge>
              </div>
              <h3 className="font-medium text-foreground">{c.summary}</h3>
              <p className="text-xs text-muted-foreground mt-1">Category: {c.category} • {c.date}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </motion.div>
);

const ChatView = () => {
  const [messages] = useState([
    { role: "assistant" as const, content: "Hello! I'm your CivicHelp AI assistant. I can help you file complaints, check status, or suggest the right category. How can I help?" },
  ]);
  const [input, setInput] = useState("");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
      <h1 className="text-2xl font-display font-bold text-foreground mb-4">AI Assistant</h1>
      <Card className="h-[500px] flex flex-col">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "assistant" ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${
                m.role === "assistant"
                  ? "bg-muted text-foreground"
                  : "gradient-primary text-primary-foreground"
              }`}>
                {m.content}
              </div>
            </div>
          ))}
        </CardContent>
        <div className="p-4 border-t border-border flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button className="gradient-primary text-primary-foreground">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

const UpdatesView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
    <h1 className="text-2xl font-display font-bold text-foreground">Public Updates</h1>
    {[
      { title: "Water Supply Maintenance", date: "Feb 20, 2026", content: "Water supply maintenance scheduled tomorrow 9 AM–1 PM in Zone 4." },
      { title: "Road Repair Completed", date: "Feb 18, 2026", content: "MG Road pothole repair completed successfully. Thank you for reporting." },
    ].map((u) => (
      <Card key={u.title}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">{u.date}</span>
          </div>
          <h3 className="font-display font-semibold text-foreground">{u.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{u.content}</p>
        </CardContent>
      </Card>
    ))}
  </motion.div>
);

export default CitizenDashboard;
