import { QueryClientProvider } from "@tanstack/react-query";

import useApp from "./modules/useApp";
import RouteConfig from "./router/Router";

function App() {
  /*======================== Props ======================== */

  const { queryClient } = useApp();

  /*======================== Return ======================== */

  return (
    <div className="relative min-h-dvh w-dvw">
      <QueryClientProvider client={queryClient}>
        <RouteConfig />
      </QueryClientProvider>
    </div>
  );
}

export default App;
