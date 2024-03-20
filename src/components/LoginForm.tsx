import Auth from "./Auth";
import { type CustomizationOptions } from "@/typings/user/Auth";
import { State } from "@/typings/user/Auth";

export function LoginForm({
  appearance,
  logo,
  socialLayout,
}: CustomizationOptions) {
  return (
    <Auth
      appearance={appearance}
      logo={logo}
      socialLayout={socialLayout}
      state={State.Login}
    />
  );
}
