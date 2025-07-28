import { QueryClientProvider } from "@tanstack/react-query";

import useApp from "./modules/useApp";
import RouteConfig from "./router/Router";

function App() {
  /*======================== Props ======================== */

  const { queryClient } = useApp();

  /*======================== Return ======================== */

  return (
    <div className="relative min-h-dvh w-dvw">
      <div className="relative z-[1]">
        <QueryClientProvider client={queryClient}>
          <RouteConfig />
        </QueryClientProvider>
      </div>

      <div className="bg-gradient-navbar fixed top-0 left-0 h-screen w-screen"></div>
      <div className="bg-gradient-bg fixed top-[0%] left-[43%] h-[150vh] w-[120vh] rotate-[30deg]"></div>
    </div>
  );
}

export default App;
