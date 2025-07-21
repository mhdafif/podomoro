import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import Timer from "@/modules/home/timer/Timer";

// import Timer from "@/modules/home/timer/Timer.old";

const Home = () => {
  /*======================== Props ======================== */

  // const { t, i18n } = useTranslation();
  // const { handleChangeLanguage } = useHome();

  /*======================== Return ======================== */

  return (
    <div className="min-h-screen">
      <div className="space-y-6">
        <div className="">
          <Card className="">
            <CardContent className="pt-6">
              <Timer />
            </CardContent>
          </Card>
          <Input placeholder="Tes" aria-invalid />
        </div>
      </div>
    </div>
  );
};

export default Home;
