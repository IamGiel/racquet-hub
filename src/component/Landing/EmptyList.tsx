import {
  Bars4Icon,
  CalendarIcon,
  ClockIcon,
  PhotoIcon,
  TableCellsIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsAuthenticated, selectUser } from "../../reducers/authReducer";
import { dialogService } from "../Services/dialog-service";
import { Login } from "../Login/Login";
import { Register } from "../Login/Register";
import { PersonStandingIcon } from "lucide-react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function EmptyList() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const navigateTo = useNavigate();

  const items = [
    {
      title: "View Proposals",
      description: "Another to-do system you’ll try but eventually give up on.",
      icon: Bars4Icon,
      background: "bg-pink-500",
      route: "/proposals",
      authStatus: isAuthenticated,
      callBack: ()=>goToRoute('/proposals')
    },
    {
      title: "Login",
      description: "Stay on top of your deadlines, or don’t — it’s up to you.",
      icon: CalendarIcon,
      background: "bg-yellow-500",
      route: "/login",
      authStatus: !isAuthenticated,
      callBack: ()=>goToRoute('/login')
    },
    {
      title: "Register",
      description: "Great for mood boards and inspiration.",
      icon: PhotoIcon,
      background: "bg-green-500",
      route: "/register",
      authStatus: !isAuthenticated,
      callBack: ()=>goToRoute('/register')
    },
    {
      title: "Plans",
      description: "Track tasks in different stages of your project.",
      icon: ViewColumnsIcon,
      background: "bg-blue-500",
      route: "/proposals",
      authStatus: isAuthenticated,
      callBack: ()=>goToRoute('/proposals')
    },
    {
      title: "FAQ",
      description: "Get a birds-eye-view of your procrastination.",
      icon: ClockIcon,
      background: "bg-purple-500",
      route: "/proposals",
      authStatus: isAuthenticated,
      callBack: ()=>goToRoute('/proposals')
    },
    {
      title: "Admin",
      description: "Get the admins view.",
      icon: PersonStandingIcon,
      background: "bg-purple-500",
      route: "/sandbox",
      authStatus: isAuthenticated && user?.data?.email === 'allqa@aricent.com',
      callBack: ()=>goToRoute('/sandbox')
    },
  ];

  function goToRoute(route:string) {
    if(route ==='/login'){
      dialogService.openDialog(Login)
    }
    if(route ==='/register'){
      dialogService.openDialog(Register)
    }
    if(route ==='/proposals'){
      navigateTo('/proposals')
    }
    if(route ==='/sandbox'){
      navigateTo('/sandbox')
    }
  }
  return (
    <div>
      {/* <pre>{JSON.stringify(user)}</pre> */}
      <h2 className="text-base font-semibold leading-6 text-gray-900 flex gap-[8px]">
        Welcome{" "}
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
        </span>
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Get started by selecting an option below or register to get to playing
        quickly.
      </p>
      <ul
        role="list"
        className="mt-6 grid grid-cols-1 gap-6 border-b border-t border-gray-200 py-6 sm:grid-cols-2"
      >
        {items.map(
          (item, itemIdx) =>
            item.authStatus && (
              <li key={itemIdx} className="flow-root">
                <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                  <div
                    className={classNames(
                      item.background,
                      "flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg"
                    )}
                  >
                    <item.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      <a
                        href="#"
                        className="focus:outline-none"
                        onClick={() => item.callBack()}
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        <span>{item.title}</span>
                        <span aria-hidden="true"> &rarr;</span>
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </li>
            )
        )}
      </ul>
      {/* <div className="mt-4 flex">
        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Or make a proposal
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div> */}
    </div>
  );
}
