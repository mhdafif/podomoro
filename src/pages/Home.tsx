import { Card, CardContent } from "@/components/ui/card";

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
          <Card className="rounded-5 from-dark-card/60 to-dark-card-secondary/60 col-span-1 border-2 border-white/10 bg-gradient-to-br backdrop-blur-xl">
            <CardContent className="pt-6">
              <Timer />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
