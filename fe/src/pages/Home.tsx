import { Card, CardContent } from "@/components/ui/card";

import Tasks from "@/modules/home/tasks/Tasks";
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
        <Card className="">
          <CardContent className="pt-6">
            <Timer />
          </CardContent>
        </Card>
        {/* <Tasks /> */}

        <Card className="">
          <CardContent className="px-4">
            <Tasks />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
