import AppIcon from "@/components/app-icon";

export type AppListProps = {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  image: string;
  github: string;
  live: string;
}

function AppList({ appList }: { appList: AppListProps[] }) {

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
