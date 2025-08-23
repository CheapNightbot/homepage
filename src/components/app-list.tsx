import { apps } from "@/lib/apps";
import { projects } from "@/lib/projects";

import AppIcon from "@/components/app-icon";

function AppList() {
  const appList = [...projects, ...apps]

  return (
    <section className="mb-4">
      <div className="grid grid-cols-5 gap-5">
        {appList.map((app) => {
          return (
            <AppIcon key={app.id} icon={app.image} name={app.name} />
          );
        })}
      </div>
    </section>
  );
}

export { AppList }
