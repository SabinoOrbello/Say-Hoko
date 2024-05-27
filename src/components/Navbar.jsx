import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Puglia from "../assets/img/PUGLIA2.png";
import { resetCart } from "../redux/cartSlice";

const navigation = [
  { name: "Home", href: "/", current: true, requiresAuth: false },
  { name: "Ordina", href: "/Ordina", current: false, requiresAuth: false },
  { name: "Info", href: "/Info", current: false, requiresAuth: false },
  { name: "BackOffice", href: "/BackOffice", current: false, requiresAuth: true, role: "admin" },
  { name: "Cart", href: "/Cart", current: false, requiresAuth: true, icon: ShoppingCartIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(null);
  const isUserLoggedIn = !!localStorage.getItem("jwt");

  const location = useLocation();
  const nome = location.state?.nome;
  const navigate = useNavigate();

  useEffect(() => {
    setUserRole(localStorage.getItem("role"));
  }, [isUserLoggedIn]);

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    dispatch(resetCart());
    navigate("/login");
  };

  // Ottieni il numero totale di articoli nel carrello
  const cartItemCount = useSelector((state) => state.cart.cartItems.reduce((total, item) => total + item.quantita, 0));

  return (
    <Disclosure as="nav" className="bg-black fixed top-0 w-full bg-black z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-gold focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gold">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img className="h-8 w-auto" src={Puglia} alt="Your Company" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation
                      .filter(
                        (item) => (!item.requiresAuth || isUserLoggedIn) && (!item.role || item.role === userRole)
                      )
                      .map((item) =>
                        item.icon ? (
                          <NavLink
                            key={item.name}
                            to={item.href}
                            exact="true"
                            activeClassName="bg-gray-900 text-gold active"
                            className={classNames(
                              "relative no-underline text-gold hover:bg-gray-800 hover:text-gold",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                          >
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                            {item.name === "Cart" && cartItemCount > 0 && (
                              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                                {cartItemCount}
                              </span>
                            )}
                          </NavLink>
                        ) : (
                          <NavLink
                            key={item.name}
                            to={item.href}
                            exact="true"
                            activeClassName="bg-gray-900 text-gold active"
                            className={classNames(
                              "no-underline text-gold hover:bg-gray-800 hover:text-gold",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                          >
                            {item.name}
                          </NavLink>
                        )
                      )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-black p-1 text-gray-400 hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-black text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <p className="text-gold font-bold ms-3">{nome}</p>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-black py-1 shadow-lg ring-1 ring-gold ring-opacity-5 focus:outline-none">
                      {isUserLoggedIn ? (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/OrderHistory"
                                className={classNames(
                                  active ? "bg-gray-800 text-gold" : "text-gray-300",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Ordini effettuati
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={logout}
                                className={classNames(
                                  active ? "bg-gray-800 text-gold" : "text-gray-300",
                                  "block w-full text-left px-4 py-2 text-sm"
                                )}
                              >
                                Logout
                              </button>
                            )}
                          </Menu.Item>
                        </>
                      ) : (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/register"
                                className={classNames(
                                  active ? "bg-gray-800 text-gold" : "text-gray-300",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Register
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/Login"
                                className={classNames(
                                  active ? "bg-gray-800 text-gold" : "text-gray-300",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Login
                              </Link>
                            )}
                          </Menu.Item>
                        </>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? "bg-gray-900 text-gold" : "text-gray-300 hover:bg-gray-800 hover:text-gold",
                    "block rounded-md px-3 py-2 text-base font-medium no-underline"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
