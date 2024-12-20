import { redirect } from "next/navigation";
import WorkspaceSettings from "@/components/workspace/workspace-settings";
import { getCurrentUser } from "@/lib/server";

type PageProps = {
  params: {
    workspaceId: string
  },
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function page({ params, searchParams }: PageProps) {
  const user = await getCurrentUser();
  const wspace = await user?.getWorkspace(params.workspaceId);

  if (!wspace) {
    return redirect('/workspaces');
  }

  const workspace = wspace.toData();

  return (
    <>
      <div className="flex-1 size-full flex flex-col">
        <div>
          <div className="h-[50px] border-b border-border px-5 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <div className="text-base font-bold">{workspace.label}</div>
            </div>
          </div>
        </div>
        <WorkspaceSettings workspace={workspace} />
      </div>
    </>
  );
}
