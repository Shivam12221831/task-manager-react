export const HydrateFallbackElement = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-linear-to-b from-white to-slate-100">
            <div className="flex flex-col items-center gap-5">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-4 border-slate-200"></div>
                <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-transparent border-t-slate-900 animate-spin"></div>
              </div>
              <p className="text-sm text-slate-600 font-medium">Loading, please wait...</p>
            </div>
        </div>   
    )
}