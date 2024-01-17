import type { User } from "@/modules/users/models";
import type { SystemSettings } from "@/modules/web/models";
import type { PageProps } from "@/pages/_app";

type Props = {
  users: User[];
  systemSettings: Readonly<SystemSettings>;
} & PageProps;

export function TrackingScreen1(props: Readonly<Props>) {
  return <main>Track Screen 1</main>;
}
