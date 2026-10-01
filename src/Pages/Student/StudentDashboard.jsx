import Button from "../../Components/Reuseable/Button";
import InternshipCard from "../../Components/Reuseable/InternshipCard";
import Panel from "../../Components/Student/Dashboard/Panel";
import ApplicationRow from "../../Components/Student/Reuseable/ApplicationRow";
import ProgressBar from "../../Components/Student/Reuseable/ProgressBar";
import StatCard from "../../Components/Student/Reuseable/StatCard";
import WelcomeBanner from "../../Components/Student/Reuseable/WelcomeBanner";


export default function StudentDashboard() {
  return (
    <div className="mx-auto w-[92%] max-w-6xl space-y-6 py-8">
      <WelcomeBanner />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Applications" value={6} hint="2 this week" />
        <StatCard label="Shortlisted" value={2} />
        <StatCard label="Saved internships" value={4} />
        <StatCard label="Average match" value="72%" hint="Across your applications" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Panel title="Recommended for you" action={<Button to="/student/recommendations" variant="outline">See all</Button>}>
            <div className="grid gap-4 sm:grid-cols-2">
              <InternshipCard id={1} title="Frontend Developer Intern" company="Leapfrog Technology" location="Lalitpur" type="On-site" duration="3 months" skills={["React", "JavaScript", "CSS"]} deadline="2026-10-20" matchScore={88} />
              <InternshipCard id={2} title=".NET Backend Intern" company="Fusemachines Nepal" location="Kathmandu" type="Hybrid" duration="6 months" skills={["C#", "ASP.NET Core", "SQL Server"]} deadline="2026-10-25" matchScore={76} />
            </div>
          </Panel>

          <Panel title="Recent applications" action={<Button to="/student/applications" variant="outline">View all</Button>}>
            <ul className="divide-y divide-line">
              <ApplicationRow title="UI/UX Design Intern" company="Cotiviti Nepal" appliedOn="Sep 28" status="Interview" />
              <ApplicationRow title="Data Analyst Intern" company="Himal Analytics" appliedOn="Sep 25" status="Shortlisted" />
              <ApplicationRow title="QA Testing Intern" company="Verisk Nepal" appliedOn="Sep 22" status="Under review" />
              <ApplicationRow title="Digital Marketing Intern" company="Sagarmatha Media" appliedOn="Sep 18" status="Rejected" />
            </ul>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Career readiness">
            <ProgressBar label="Profile" percent={80} />
            <ProgressBar label="Skills" percent={65} />
            <ProgressBar label="Resume" percent={100} />
            <ProgressBar label="Portfolio" percent={20} />
          </Panel>

          <Panel title="Skills to learn">
            <p className="mb-3 text-sm text-muted">Missing from your top matches:</p>
            <ul className="flex flex-wrap gap-2">
              <li className="rounded-full bg-red-50 px-3 py-1 text-red-800">Git</li>
              <li className="rounded-full bg-red-50 px-3 py-1 text-red-800">Docker</li>
              <li className="rounded-full bg-red-50 px-3 py-1 text-red-800">Unit testing</li>
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}