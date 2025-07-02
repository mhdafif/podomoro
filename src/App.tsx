import { QueryClientProvider } from "@tanstack/react-query";

import useApp from "./modules/useApp";
import RouteConfig from "./router/Router";

function App() {
  /*======================== Props ======================== */

  const { queryClient } = useApp();

  /*======================== Return ======================== */

  return (
    <div className="laptop:bg-whitef8 relativ flex h-full w-full min-w-[100vw] items-center justify-center bg-white">
      <QueryClientProvider client={queryClient}>
        <RouteConfig />
      </QueryClientProvider>
    </div>
  );
}

export default App;
