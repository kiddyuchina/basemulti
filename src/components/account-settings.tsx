
'use client';

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { CircleUserIcon, KeyIcon, Settings2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useGlobalStore } from "@/store/global";
import Loading from "@/components/loading";
import { useState } from "react";
import { cn, getInitials } from "@/lib/utils";
// import MyAccount from "./account-settings/my-account";
// import MySettings from "./account-settings/my-settings";
// import Tokens from "./account-settings/tokens";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

type TabType = 'account' | 'settings' | 'tokens' | 'connections';

const MyAccount = dynamic(() => import('./account-settings/my-account'));
const MySettings = dynamic(() => import('./account-settings/my-settings'));
const Tokens = dynamic(() => import('./account-settings/tokens'));

export default function AccountSettings({ open, setOpen }: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [tab, setTab] = useState<TabType>('account');
  const t = useTranslations('ModalAccount');

  const renderTab = () => {
    switch (tab) {
      case 'account':
        return <MyAccount />;
      case 'settings':
        return <MySettings />;
      case 'tokens':
        return <Tokens />;
      case 'connections':
        return <div>App</div>;
    }
  }

  const { user } = useGlobalStore(store => ({
    user: store.user
  }));

  if (!open) {
    return null;
  }

  if (!user) {
    return <Loading />;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {open && <DialogContent className="flex items-center p-0 h-[calc(100vh-100px)] max-w-[calc(100vw-100px)] md:w-[1150px] w-[1150px] gap-0" visibleClose={false}>
        <div className="w-[240px] h-full min-h-32 bg-muted/30 rounded-l-md p-2 border-r border-r-border">
          <div className="">
            <div className="text-muted-foreground text-xs p-1 mb-2">{t('modal_title')}</div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 px-2">
                <Avatar className="w-6 h-6 border border-border">
                  <AvatarImage src="https://avatars.githubusercontent.com/u/1013686qwe?v=4" />
                  <AvatarFallback className="text-xs font-medium">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="">
                  <div className="text-sm">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </div>
              </div>
              <div className={cn(
                "text-sm h-8 flex items-center gap-2 rounded-md hover:bg-sidebar px-2 cursor-pointer",
                tab === 'account' && 'bg-sidebar'
              )} onClick={() => setTab('account')}>
                <CircleUserIcon className="size-4" />
                {t('my_account')}
              </div>
              <div className={cn(
                "text-sm h-8 flex items-center gap-2 rounded-md hover:bg-sidebar px-2 cursor-pointer",
                tab === 'settings' && 'bg-sidebar'
              )} onClick={() => setTab('settings')}>
                <Settings2Icon className="size-4" />
                {t('my_settings')}
              </div>
              <div className={cn(
                "text-sm h-8 flex items-center gap-2 rounded-md hover:bg-sidebar px-2 cursor-pointer",
                tab === 'tokens' && 'bg-sidebar'
              )} onClick={() => setTab('tokens')}>
                <KeyIcon className="size-4" />
                {t('api_tokens')}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 w-[900px] h-full">
          <div className="flex flex-col w-full px-16 py-8 gap-12 h-full overflow-y-scroll">
            {renderTab()}
          </div>
        </div>
      </DialogContent>}
    </Dialog>
  );
}