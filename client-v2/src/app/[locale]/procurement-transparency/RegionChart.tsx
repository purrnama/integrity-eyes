export default function RegionChart({ title }: { title: string }) {
  return (
    <div className="flex flex-col flex-1 h-full grow p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg">
      <h2 className="font-medium">{title}</h2>
    </div>
  );
}
