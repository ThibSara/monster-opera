import Monster from "@/components/Monster";
import StepSequencer from "@/components/StepSequencer";

export default function Home() {
  return (
    <div className="text-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Monster Opera</span>
              <img
                alt=""
                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
              <div className="text-xl">Monster Opera</div>
            </a>
          </div>
          
        </nav>
      </header>
      <StepSequencer/>
    </div>
  );
}
