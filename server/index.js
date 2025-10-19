import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
import { Link } from "react-router-dom";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const Header = () => {
  return /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-10 py-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-gray-800 dark:text-white", children: [
      /* @__PURE__ */ jsx("div", { className: "size-6 text-primary", children: /* @__PURE__ */ jsx("svg", { fill: "none", viewBox: "0 0 48 48", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { clipRule: "evenodd", d: "M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z", fill: "currentColor", fillRule: "evenodd" }) }) }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "text-lg font-bold leading-tight tracking-[-0.015em] hover:text-primary transition-colors cursor-pointer", children: "Murat Şahin" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:flex flex-1 justify-end gap-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-9", children: [
      /* @__PURE__ */ jsx("a", { className: "text-gray-600 dark:text-gray-300 text-sm font-medium leading-normal", href: "/projects", children: "Portfolio" }),
      /* @__PURE__ */ jsx("a", { className: "text-gray-600 dark:text-gray-300 text-sm font-medium leading-normal", href: "/about", children: "About Me" }),
      /* @__PURE__ */ jsx("a", { className: "text-gray-600 dark:text-gray-300 text-sm font-medium leading-normal", href: "/contact", children: "Contact" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx("button", { className: "text-gray-800 dark:text-white", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", children: "menu" }) }) })
  ] });
};
const Footer = () => {
  return /* @__PURE__ */ jsxs("footer", { className: "flex flex-col gap-6 px-5 py-10 text-center border-t border-solid border-gray-200 dark:border-gray-700", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center gap-6", children: [
      /* @__PURE__ */ jsx("a", { className: "text-gray-500 dark:text-gray-400 text-base font-normal leading-normal", href: "/", children: "Homepage" }),
      /* @__PURE__ */ jsx("a", { className: "text-gray-500 dark:text-gray-400 text-base font-normal leading-normal", href: "/projects", children: "Portfolio" }),
      /* @__PURE__ */ jsx("a", { className: "text-gray-500 dark:text-gray-400 text-base font-normal leading-normal", href: "/about", children: "About Me" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal", children: "© 2025 Murat Şahin. All rights reserved." })
  ] });
};
const HomePage = () => {
  return /* @__PURE__ */ jsx("div", {
    className: "relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display",
    children: /* @__PURE__ */ jsx("div", {
      className: "layout-container flex h-full grow flex-col",
      children: /* @__PURE__ */ jsx("div", {
        className: "flex flex-1 justify-center py-5",
        children: /* @__PURE__ */ jsxs("div", {
          className: "layout-content-container flex flex-col w-full max-w-6xl flex-1 px-4 sm:px-6 lg:px-8",
          children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx("main", {
            className: "flex-grow",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex min-h-[calc(100vh-200px)] flex-col gap-6 items-center justify-center text-center p-4",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex flex-col gap-4",
                children: [/* @__PURE__ */ jsx("h1", {
                  className: "text-gray-900 dark:text-white text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tighter",
                  children: "Murat Şahin | Full-Stack Developer"
                }), /* @__PURE__ */ jsx("h2", {
                  className: "text-gray-600 dark:text-gray-300 text-lg sm:text-xl font-normal leading-normal max-w-2xl mx-auto",
                  children: "I develop modern and interactive web applications with a focus on user experience. Check out the solutions I've created."
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex flex-col sm:flex-row flex-wrap gap-4 mt-6",
                children: [/* @__PURE__ */ jsx(Link, {
                  to: "/projects",
                  className: "flex min-w-[140px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "truncate",
                    children: "My Projects"
                  })
                }), /* @__PURE__ */ jsx(Link, {
                  to: "/about",
                  className: "flex min-w-[140px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 border border-primary text-primary bg-transparent hover:bg-primary/10 dark:text-primary dark:border-primary dark:hover:bg-primary/20 transition-colors text-base font-bold leading-normal tracking-[0.015em]",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "truncate",
                    children: "More About Me"
                  })
                })]
              })]
            })
          }), /* @__PURE__ */ jsx(Footer, {})]
        })
      })
    })
  });
};
const HomePage$1 = UNSAFE_withComponentProps(HomePage);
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HomePage$1
}, Symbol.toStringTag, { value: "Module" }));
const AboutMePage = () => {
  const SidebarLink = ({
    href,
    icon,
    text,
    isActive = false
  }) => {
    const baseClasses = "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium leading-normal";
    const activeClasses = "bg-primary/10 dark:bg-primary/20 text-primary";
    const inactiveClasses = "hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200";
    return /* @__PURE__ */ jsxs("a", {
      className: `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`,
      href,
      children: [/* @__PURE__ */ jsx("span", {
        className: `material-symbols-outlined text-xl ${isActive ? "text-primary" : "text-zinc-600 dark:text-zinc-300"}`,
        children: icon
      }), /* @__PURE__ */ jsx("p", {
        className: `${isActive ? "text-primary" : "text-zinc-800 dark:text-zinc-200"}`,
        children: text
      })]
    });
  };
  return /* @__PURE__ */ jsx("div", {
    className: "relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display",
    children: /* @__PURE__ */ jsx("div", {
      className: "layout-container flex h-full grow flex-col",
      children: /* @__PURE__ */ jsx("div", {
        className: "flex flex-1 justify-center py-5",
        children: /* @__PURE__ */ jsxs("div", {
          className: "layout-content-container flex flex-col w-full max-w-6xl flex-1 px-4 sm:px-6 lg:px-8",
          children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col md:flex-row gap-8 w-full mt-10",
            children: [/* @__PURE__ */ jsx("aside", {
              className: "w-full md:w-64 flex-shrink-0",
              children: /* @__PURE__ */ jsxs("div", {
                className: "sticky top-8 bg-background-light dark:bg-background-dark rounded-xl p-4 border border-zinc-200 dark:border-zinc-800",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex flex-col gap-4",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex items-center gap-4",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "bg-center bg-no-repeat aspect-square bg-cover rounded-full size-16",
                      "data-alt": "Mehmet Yılmaz's profile picture",
                      style: {
                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBg65H5USjg6t2qCPC3m15xxQ1oYS_P03edxQUDXtL51bQJ9l_FqQiTWlJcZAxCeVTHYYR9b2RLS7EJQWxlfQvwpO-YFcD88hPtVjoEUHRELgnLDM3LtX-Vce591sgP_m5pbhjo-LpiXA96flF6GwljXPVhZvmG1eOTp_-rfbSPUZG83ZFZIIDmi60y9IRoGkMRGwWtiMqFgvFKWIoyM0y9IGBtTRBQcRRpyEZF2QeHIts2xk-O-Vj-qwNhZugqpFt-lQo4N8mLXJY")'
                      }
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "flex flex-col",
                      children: [/* @__PURE__ */ jsx("h1", {
                        className: "text-zinc-900 dark:text-white text-lg font-bold leading-tight",
                        children: "Mehmet Yılmaz"
                      }), /* @__PURE__ */ jsx("p", {
                        className: "text-zinc-500 dark:text-zinc-400 text-sm font-normal leading-normal",
                        children: "Yazılım Geliştirici"
                      })]
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex flex-col gap-2 pt-4",
                    children: [/* @__PURE__ */ jsx(SidebarLink, {
                      href: "#egitim",
                      icon: "school",
                      text: "Eğitim",
                      isActive: true
                    }), /* @__PURE__ */ jsx(SidebarLink, {
                      href: "#deneyim",
                      icon: "work",
                      text: "Deneyim"
                    }), /* @__PURE__ */ jsx(SidebarLink, {
                      href: "#beceriler",
                      icon: "code",
                      text: "Beceriler"
                    }), /* @__PURE__ */ jsx(SidebarLink, {
                      href: "#ilgi-alanlari",
                      icon: "camera",
                      text: "İlgi Alanları"
                    })]
                  })]
                }), /* @__PURE__ */ jsx("button", {
                  className: "mt-6 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "truncate",
                    children: "CV'mi İndir"
                  })
                })]
              })
            }), /* @__PURE__ */ jsxs("main", {
              className: "flex-1 flex flex-col gap-8",
              children: [/* @__PURE__ */ jsx("div", {
                className: "flex flex-wrap justify-between items-center gap-3 p-4 bg-white dark:bg-[#1A242E] rounded-xl border border-zinc-200 dark:border-zinc-800",
                children: /* @__PURE__ */ jsx("p", {
                  className: "text-zinc-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]",
                  children: "Özgeçmiş"
                })
              }), /* @__PURE__ */ jsxs("section", {
                className: "flex flex-col gap-4 p-4 md:p-6 bg-white dark:bg-[#1A242E] rounded-xl border border-zinc-200 dark:border-zinc-800",
                id: "egitim",
                children: [/* @__PURE__ */ jsx("h2", {
                  className: "text-zinc-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]",
                  children: "Eğitim"
                }), /* @__PURE__ */ jsxs("div", {
                  className: "grid grid-cols-[auto_1fr] gap-x-4",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex flex-col items-center gap-1 pt-3",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "material-symbols-outlined text-primary text-2xl",
                      children: "school"
                    }), /* @__PURE__ */ jsx("div", {
                      className: "w-[2px] bg-zinc-200 dark:bg-zinc-700 h-full"
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex flex-1 flex-col pb-6",
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "text-zinc-900 dark:text-white text-base font-semibold leading-normal",
                      children: "Orta Doğu Teknik Üniversitesi"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-zinc-500 dark:text-zinc-400 text-sm font-normal leading-normal",
                      children: "Bilgisayar Mühendisliği"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-zinc-400 dark:text-zinc-500 text-xs font-normal leading-normal mt-1",
                      children: "2016 - 2020"
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex flex-col items-center gap-1",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "w-[2px] bg-zinc-200 dark:bg-zinc-700 h-full"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "material-symbols-outlined text-primary text-2xl",
                      children: "school"
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex flex-1 flex-col pt-2",
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "text-zinc-900 dark:text-white text-base font-semibold leading-normal",
                      children: "Ankara Fen Lisesi"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-zinc-500 dark:text-zinc-400 text-sm font-normal leading-normal",
                      children: "Sayısal"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-zinc-400 dark:text-zinc-500 text-xs font-normal leading-normal mt-1",
                      children: "2012 - 2016"
                    })]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("section", {
                className: "flex flex-col gap-4 p-4 md:p-6 bg-white dark:bg-[#1A242E] rounded-xl border border-zinc-200 dark:border-zinc-800",
                id: "deneyim",
                children: [/* @__PURE__ */ jsx("h2", {
                  className: "text-zinc-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]",
                  children: "İş Deneyimi"
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-6",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex gap-4",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "flex-shrink-0 text-primary pt-1",
                      children: /* @__PURE__ */ jsx("span", {
                        className: "material-symbols-outlined text-2xl",
                        children: "work"
                      })
                    }), /* @__PURE__ */ jsxs("div", {
                      children: [/* @__PURE__ */ jsx("p", {
                        className: "text-zinc-900 dark:text-white text-base font-semibold leading-normal",
                        children: "Teknoloji A.Ş."
                      }), /* @__PURE__ */ jsx("p", {
                        className: "text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-normal",
                        children: "Kıdemli Yazılım Geliştirici"
                      }), /* @__PURE__ */ jsx("p", {
                        className: "text-zinc-400 dark:text-zinc-500 text-xs font-normal mt-1",
                        children: "Ocak 2022 - Günümüz"
                      }), /* @__PURE__ */ jsxs("ul", {
                        className: "list-disc list-inside text-zinc-600 dark:text-zinc-300 text-sm mt-2 space-y-1",
                        children: [/* @__PURE__ */ jsx("li", {
                          children: "Yeni nesil web uygulamalarının geliştirilmesi ve bakımı."
                        }), /* @__PURE__ */ jsx("li", {
                          children: "React ve Node.js kullanarak ölçeklenebilir API'ler oluşturma."
                        }), /* @__PURE__ */ jsx("li", {
                          children: "Genç geliştiricilere mentorluk yapma ve kod incelemeleri."
                        })]
                      })]
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex gap-4",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "flex-shrink-0 text-primary pt-1",
                      children: /* @__PURE__ */ jsx("span", {
                        className: "material-symbols-outlined text-2xl",
                        children: "work"
                      })
                    }), /* @__PURE__ */ jsxs("div", {
                      children: [/* @__PURE__ */ jsx("p", {
                        className: "text-zinc-900 dark:text-white text-base font-semibold leading-normal",
                        children: "Yazılım Çözümleri Ltd."
                      }), /* @__PURE__ */ jsx("p", {
                        className: "text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-normal",
                        children: "Yazılım Geliştirici"
                      }), /* @__PURE__ */ jsx("p", {
                        className: "text-zinc-400 dark:text-zinc-500 text-xs font-normal mt-1",
                        children: "Temmuz 2020 - Aralık 2021"
                      }), /* @__PURE__ */ jsxs("ul", {
                        className: "list-disc list-inside text-zinc-600 dark:text-zinc-300 text-sm mt-2 space-y-1",
                        children: [/* @__PURE__ */ jsx("li", {
                          children: "Kurumsal müşteriler için özel yazılım çözümleri geliştirme."
                        }), /* @__PURE__ */ jsx("li", {
                          children: "Python ve Django ile arka uç sistemleri üzerinde çalışma."
                        }), /* @__PURE__ */ jsx("li", {
                          children: "Mevcut sistemlerde performans iyileştirmeleri yapma."
                        })]
                      })]
                    })]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("section", {
                className: "flex flex-col gap-4 p-4 md:p-6 bg-white dark:bg-[#1A242E] rounded-xl border border-zinc-200 dark:border-zinc-800",
                id: "beceriler",
                children: [/* @__PURE__ */ jsx("h2", {
                  className: "text-zinc-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]",
                  children: "Beceriler"
                }), /* @__PURE__ */ jsxs("div", {
                  className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                  children: [/* @__PURE__ */ jsxs("div", {
                    children: [/* @__PURE__ */ jsx("h3", {
                      className: "text-zinc-800 dark:text-zinc-100 text-base font-semibold mb-3",
                      children: "Teknik Beceriler"
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "space-y-4",
                      children: [/* @__PURE__ */ jsxs("div", {
                        children: [/* @__PURE__ */ jsxs("div", {
                          className: "flex justify-between mb-1",
                          children: [/* @__PURE__ */ jsx("span", {
                            className: "text-sm font-medium text-zinc-700 dark:text-zinc-300",
                            children: "Python"
                          }), /* @__PURE__ */ jsx("span", {
                            className: "text-sm font-medium text-zinc-500 dark:text-zinc-400",
                            children: "90%"
                          })]
                        }), /* @__PURE__ */ jsx("div", {
                          className: "w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2",
                          children: /* @__PURE__ */ jsx("div", {
                            className: "bg-primary h-2 rounded-full",
                            style: {
                              width: "90%"
                            }
                          })
                        })]
                      }), /* @__PURE__ */ jsxs("div", {
                        children: [/* @__PURE__ */ jsxs("div", {
                          className: "flex justify-between mb-1",
                          children: [/* @__PURE__ */ jsx("span", {
                            className: "text-sm font-medium text-zinc-700 dark:text-zinc-300",
                            children: "JavaScript"
                          }), /* @__PURE__ */ jsx("span", {
                            className: "text-sm font-medium text-zinc-500 dark:text-zinc-400",
                            children: "85%"
                          })]
                        }), /* @__PURE__ */ jsx("div", {
                          className: "w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2",
                          children: /* @__PURE__ */ jsx("div", {
                            className: "bg-primary h-2 rounded-full",
                            style: {
                              width: "85%"
                            }
                          })
                        })]
                      }), /* @__PURE__ */ jsxs("div", {
                        children: [/* @__PURE__ */ jsxs("div", {
                          className: "flex justify-between mb-1",
                          children: [/* @__PURE__ */ jsx("span", {
                            className: "text-sm font-medium text-zinc-700 dark:text-zinc-300",
                            children: "Figma"
                          }), /* @__PURE__ */ jsx("span", {
                            className: "text-sm font-medium text-zinc-500 dark:text-zinc-400",
                            children: "75%"
                          })]
                        }), /* @__PURE__ */ jsx("div", {
                          className: "w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2",
                          children: /* @__PURE__ */ jsx("div", {
                            className: "bg-primary h-2 rounded-full",
                            style: {
                              width: "75%"
                            }
                          })
                        })]
                      })]
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    children: [/* @__PURE__ */ jsx("h3", {
                      className: "text-zinc-800 dark:text-zinc-100 text-base font-semibold mb-3",
                      children: "Kişisel Beceriler"
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "flex flex-wrap gap-2",
                      children: [/* @__PURE__ */ jsx("span", {
                        className: "bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full",
                        children: "Ekip Çalışması"
                      }), /* @__PURE__ */ jsx("span", {
                        className: "bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full",
                        children: "Problem Çözme"
                      }), /* @__PURE__ */ jsx("span", {
                        className: "bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full",
                        children: "İletişim"
                      }), /* @__PURE__ */ jsx("span", {
                        className: "bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full",
                        children: "Zaman Yönetimi"
                      })]
                    })]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("section", {
                className: "flex flex-col gap-4 p-4 md:p-6 bg-white dark:bg-[#1A242E] rounded-xl border border-zinc-200 dark:border-zinc-800",
                id: "ilgi-alanlari",
                children: [/* @__PURE__ */ jsx("h2", {
                  className: "text-zinc-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]",
                  children: "İlgi Alanları"
                }), /* @__PURE__ */ jsxs("div", {
                  className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex flex-col items-center gap-2 p-4 bg-background-light dark:bg-background-dark rounded-lg",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "material-symbols-outlined text-primary text-3xl",
                      children: "photo_camera"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-zinc-700 dark:text-zinc-300 text-sm font-medium",
                      children: "Fotoğrafçılık"
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex flex-col items-center gap-2 p-4 bg-background-light dark:bg-background-dark rounded-lg",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "material-symbols-outlined text-primary text-3xl",
                      children: "flight_takeoff"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-zinc-700 dark:text-zinc-300 text-sm font-medium",
                      children: "Seyahat"
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex flex-col items-center gap-2 p-4 bg-background-light dark:bg-background-dark rounded-lg",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "material-symbols-outlined text-primary text-3xl",
                      children: "menu_book"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-zinc-700 dark:text-zinc-300 text-sm font-medium",
                      children: "Kitap Okuma"
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex flex-col items-center gap-2 p-4 bg-background-light dark:bg-background-dark rounded-lg",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "material-symbols-outlined text-primary text-3xl",
                      children: "hiking"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-zinc-700 dark:text-zinc-300 text-sm font-medium",
                      children: "Doğa Yürüyüşü"
                    })]
                  })]
                })]
              })]
            })]
          })]
        })
      })
    })
  });
};
const AboutMePage$1 = UNSAFE_withComponentProps(AboutMePage);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AboutMePage$1
}, Symbol.toStringTag, { value: "Module" }));
const ProjectCard = ({ title, description, imageUrl, detailsLink }) => {
  return /* @__PURE__ */ jsxs("div", { className: "project-card flex flex-col gap-4 bg-card-light dark:bg-card-dark rounded-xl overflow-hidden shadow-md transition-transform duration-300", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-full bg-center bg-no-repeat aspect-video bg-cover",
        "data-alt": title,
        style: { backgroundImage: `url("${imageUrl}")` }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "p-5 flex flex-col flex-grow", children: [
      /* @__PURE__ */ jsx("p", { className: "text-text-light dark:text-text-dark text-xl font-bold leading-normal", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-text-light/80 dark:text-text-dark/80 text-sm font-normal leading-normal mt-2 mb-4 flex-grow", children: description }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: detailsLink,
          className: "details-link mt-auto self-start text-primary dark:text-secondary text-sm font-semibold leading-normal py-2 px-4 rounded-lg border border-primary dark:border-secondary hover:text-white dark:hover:text-white transition-colors duration-300",
          children: "Detayları Gör"
        }
      )
    ] })
  ] });
};
const projects = [
  {
    title: "E-ticaret Platformu Arayüzü",
    description: "Kullanıcı dostu bir mobil alışveriş uygulaması için geliştirilen arayüz tasarımı. Figma ve React Native kullanıldı.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQp0QR4Vf1pX2us4LsfD7PiLWEsjbbtDv2n8ZOgltwznJSRBkSBCeBL-ppt7WnkNMGw32SMBH7IB7OkQOP_b5xasBCGvWtKkNHPef3Ewz5zX4K9J4MvOJSmnOYCRCCqOBspa28wydz7rKyk8irlDim3P9Q6RQU8MxhPFtWnLsIG7m4x3y5hbZyMoEuVadGm_lRLocBiuOhKO7BZXsVkEDW9Mqt1BI7GR8aDZ-OOXkbD7wwO35HEVgK7Rpn_J4ebI_wAY6J7N5FLbg",
    detailsLink: "/projects/ecommerce"
  },
  {
    title: "Görev Yönetim Uygulaması",
    description: "Ekiplerin görevleri ve projeleri organize etmesine yardımcı olan web tabanlı bir uygulama.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB77jFN9iDG1AwL2rbEhUn-Ohtu289iJGjww8giSBiyYOaL-bP0alUzgMbqtR2tgzhBNf5WuDTZEu_e6ioaYazaNIIEgBG7xWpa4iDSwI8NPhfrQ2YM4v0292mdpxC9IiWkuzH5CG9H7Zvqi5We9HwuOiXZ5GootM68eSDlVSBoEzA5tnE_JXC7lFwUsUXhQL9zOaLDqy8Jk9hZLBtO0LlWpRhhV5fjpCo6bVxKTLII_-6Pv6dsd9AxO2FrHdyqLFqls55xi2TnKU8",
    detailsLink: "/projects/task-manager"
  },
  {
    title: "Kişisel Blog Tasarımı",
    description: "Kişisel bir blog için temiz ve modern bir tasarım.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6Vt0AtwFkM_4H_bWWZ5lD2fhqCEseDoRqFIqJI-T4fYIfaBSDhJVT63w8smBK3XVTVuG8msF7fQ3RwU3Iibx6P-Gh9sXn4BPs0kBoaRi-7vVpiwk6RiZMSSm7lUGUdAc5ibS0plmFyjt0TwHyqTHSdDlbkd5GhWkvGh7VH3PRrNXvscp6K6RhGD374XwWZZ2Nks4TT1D9AqQufcwjhgej4RoET-QNXAyr-ack0cMpS-5qsXG5Bz3ajly55EERX6ZyaHG0_t2gs8c",
    detailsLink: "/projects/blog-design"
  },
  {
    title: "Hava Durumu Uygulama Konsepti",
    description: "Görsel olarak çekici bir hava durumu uygulama konsepti.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQd6BHjkaMOkBddXvoTK2Ct6lyfyRGXQtjDUmYYMT9xaxVev-h_5JzEeem_x-c6TLXR9yGztP59987FpaTyoNPf_DiECVLu-lhnpvgUzoNzE3vPH4RpYymUmMlWvyrG_NRMOMoYa5OlyflDDaU4hmTV4RqgzJI_1UECfNAuH4OI7ie6uCBu8H5-qM4TrFIogQjVCD1vpLFYu2jQ64X17cfEYUwO4_DCJAlYYTCFOhMnKt_8WeES8Vqs_-v6-dR__4Etg38I15lxig",
    detailsLink: "/projects/weather-app"
  },
  {
    title: "Tarif Bulucu Uygulaması",
    description: "Tarifleri keşfetmek ve kaydetmek için bir mobil uygulama.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyL16V-cRXZtUI1Te7vJVWYRbEP3Pk5QNLiR_HFQgtNnF5RXc1mrff2fafVjQK3dnDOo_R09qFWr5Lxc9DyBXic5tHNJiMD5Fp6JvTv2-DgpV7xBPum6Rt6u-7behjw0nnSjUjF0eeyjXSFdo-G8DiKKAKxXi0gxkX8wTlTMMRDeAN7UYOmU1eJGI9ZlzgRGE4YU7IMFHFIHKHc8goQ3NQUZ1Mttv54dyuKjQyl7_yQruoWJvqyyqKPrX2hUt1kHfZKo9Kh4nVyyA",
    detailsLink: "/projects/recipe-finder"
  },
  {
    title: "Seyahat Planlayıcı Arayüzü",
    description: "Bir sonraki seyahatinizi planlamak için bir UI kiti.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnwGPak8qGHoRTCAdFYhTJTmHxKeQpfZCc1dGqnXaAnW6xpO4Z1SgarbfGmdETmWQKOTB3CEyJfdVSwpK1EBUa6j8K_Kw5-D02sjQrP9Q7tkJ7_HKVofX4u5HPK1SBAHdFp_3AFpD5vtTP6NKPne6nEb4AbZ-pQSN6ShEUeUKTBdTj3Lxo_lqGG5cEzC432UjTrKUu_P4yQq-_8IUTDYb7WBwaB84a8rzwYOrbBo86855WGpKeIxtN6DB_fnjmpYRkuRotYT4G1EE",
    detailsLink: "/projects/travel-planner"
  }
];
const ProjectsPage = () => {
  return /* @__PURE__ */ jsx("div", {
    className: "relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display",
    children: /* @__PURE__ */ jsx("div", {
      className: "layout-container flex h-full grow flex-col",
      children: /* @__PURE__ */ jsx("div", {
        className: "flex flex-1 justify-center py-5",
        children: /* @__PURE__ */ jsxs("div", {
          className: "layout-content-container flex flex-col w-full max-w-6xl flex-1 px-4 sm:px-6 lg:px-8",
          children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsxs("main", {
            className: "flex-grow p-4 md:p-6 lg:p-8",
            children: [/* @__PURE__ */ jsx("div", {
              className: "flex flex-wrap justify-between gap-4 mb-8",
              children: /* @__PURE__ */ jsxs("div", {
                className: "flex min-w-72 flex-col gap-2",
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-primary dark:text-secondary text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]",
                  children: "Projelerim"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-text-light dark:text-gray-400 text-base lg:text-lg font-normal leading-normal",
                  children: "Tasarım ve geliştirme becerilerimi sergileyen çalışmalarımın bir koleksiyonu."
                })]
              })
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex gap-3 p-3 flex-wrap mb-8",
              children: [/* @__PURE__ */ jsx("button", {
                className: "flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary/10 dark:bg-card-dark px-4 text-primary dark:text-secondary text-sm font-medium leading-normal ring-2 ring-primary dark:ring-secondary",
                children: "Tümü"
              }), /* @__PURE__ */ jsx("button", {
                className: "flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-card-light dark:bg-card-dark px-4 text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:bg-primary/10 dark:hover:bg-primary/30",
                children: "Web Uygulamaları"
              }), /* @__PURE__ */ jsx("button", {
                className: "flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-card-light dark:bg-card-dark px-4 text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:bg-primary/10 dark:hover:bg-primary/30",
                children: "Mobil Uygulamalar"
              }), /* @__PURE__ */ jsx("button", {
                className: "flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-card-light dark:bg-card-dark px-4 text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:bg-primary/10 dark:hover:bg-primary/30",
                children: "Tasarım Projeleri"
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
              children: projects.map((project, index) => /* @__PURE__ */ jsx(ProjectCard, {
                title: project.title,
                description: project.description,
                imageUrl: project.imageUrl,
                detailsLink: project.detailsLink
              }, index))
            })]
          }), /* @__PURE__ */ jsx(Footer, {})]
        })
      })
    })
  });
};
const ProjectsPage$1 = UNSAFE_withComponentProps(ProjectsPage);
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProjectsPage$1
}, Symbol.toStringTag, { value: "Module" }));
const ContactInfo = ({
  icon,
  text,
  link,
  isEmail = false
}) => /* @__PURE__ */ jsxs("a", {
  className: "flex items-center gap-4 group text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors",
  href: isEmail ? `mailto:${link}` : link,
  target: isEmail ? "_self" : "_blank",
  rel: "noopener noreferrer",
  children: [/* @__PURE__ */ jsx("span", {
    className: "material-symbols-outlined text-3xl",
    children: icon
  }), /* @__PURE__ */ jsx("span", {
    className: "text-base font-medium",
    children: text
  })]
});
const useFormState = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  return [formData, handleChange];
};
const ContactPage = () => {
  const initialForm = {
    name: "",
    email: "",
    subject: "",
    message: ""
  };
  const [formData, handleChange] = useFormState(initialForm);
  const [statusMessage, setStatusMessage] = useState({
    type: "",
    message: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatusMessage({
        type: "error",
        message: "Lütfen tüm alanları doldurun."
      });
      return;
    }
    setStatusMessage({
      type: "loading",
      message: "Mesajınız gönderiliyor..."
    });
    setTimeout(() => {
      console.log("Form gönderildi:", formData);
      setStatusMessage({
        type: "success",
        message: "Mesajınız başarıyla gönderilmiştir. Teşekkür ederim!"
      });
    }, 1500);
  };
  return /* @__PURE__ */ jsx("div", {
    className: "relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display",
    children: /* @__PURE__ */ jsx("div", {
      className: "layout-container flex h-full grow flex-col",
      children: /* @__PURE__ */ jsx("div", {
        className: "flex flex-1 justify-center py-5",
        children: /* @__PURE__ */ jsxs("div", {
          className: "layout-content-container flex flex-col w-full max-w-6xl flex-1 px-4 sm:px-6 lg:px-8",
          children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx("div", {
            className: "layout-container flex h-full grow flex-col",
            children: /* @__PURE__ */ jsx("div", {
              className: "px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-10 md:py-20 mt-10",
              children: /* @__PURE__ */ jsxs("div", {
                className: "layout-content-container flex flex-col max-w-[960px] flex-1",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex flex-wrap justify-between gap-3 p-4",
                  children: /* @__PURE__ */ jsx("p", {
                    className: "text-4xl font-black leading-tight tracking-[-0.033em] min-w-72 text-gray-900 dark:text-white",
                    children: "Benimle İletişime Geçin"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex flex-col lg:flex-row gap-8 mt-10",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex-1 p-4",
                    children: [/* @__PURE__ */ jsx("h2", {
                      className: "text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100",
                      children: "Bir Mesaj Bırakın"
                    }), statusMessage.message && /* @__PURE__ */ jsx("div", {
                      className: `p-3 mb-4 rounded-lg ${statusMessage.type === "error" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"}`,
                      children: statusMessage.message
                    }), /* @__PURE__ */ jsxs("form", {
                      onSubmit: handleSubmit,
                      className: "space-y-6",
                      children: [/* @__PURE__ */ jsxs("div", {
                        className: "flex flex-col sm:flex-row gap-6",
                        children: [/* @__PURE__ */ jsxs("label", {
                          className: "flex flex-col flex-1",
                          children: [/* @__PURE__ */ jsx("p", {
                            className: "text-base font-medium leading-normal pb-2 text-gray-700 dark:text-gray-300",
                            children: "Adınız"
                          }), /* @__PURE__ */ jsx("input", {
                            className: "form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-gray-300 dark:border-[#3b4754] bg-white dark:bg-[#1c2127] h-14 placeholder:text-gray-400 dark:placeholder:text-[#9dabb9] p-[15px] text-base font-normal leading-normal",
                            placeholder: "Adınızı girin",
                            required: true,
                            type: "text",
                            name: "name",
                            value: formData.name,
                            onChange: handleChange,
                            disabled: statusMessage.type === "loading"
                          })]
                        }), /* @__PURE__ */ jsxs("label", {
                          className: "flex flex-col flex-1",
                          children: [/* @__PURE__ */ jsx("p", {
                            className: "text-base font-medium leading-normal pb-2 text-gray-700 dark:text-gray-300",
                            children: "E-posta Adresiniz"
                          }), /* @__PURE__ */ jsx("input", {
                            className: "form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-gray-300 dark:border-[#3b4754] bg-white dark:bg-[#1c2127] h-14 placeholder:text-gray-400 dark:placeholder:text-[#9dabb9] p-[15px] text-base font-normal leading-normal",
                            placeholder: "E-posta adresinizi girin",
                            required: true,
                            type: "email",
                            name: "email",
                            value: formData.email,
                            onChange: handleChange,
                            disabled: statusMessage.type === "loading"
                          })]
                        })]
                      }), /* @__PURE__ */ jsxs("label", {
                        className: "flex flex-col flex-1",
                        children: [/* @__PURE__ */ jsx("p", {
                          className: "text-base font-medium leading-normal pb-2 text-gray-700 dark:text-gray-300",
                          children: "Konu"
                        }), /* @__PURE__ */ jsx("input", {
                          className: "form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-gray-300 dark:border-[#3b4754] bg-white dark:bg-[#1c2127] h-14 placeholder:text-gray-400 dark:placeholder:text-[#9dabb9] p-[15px] text-base font-normal leading-normal",
                          placeholder: "Konuyu girin",
                          required: true,
                          type: "text",
                          name: "subject",
                          value: formData.subject,
                          onChange: handleChange,
                          disabled: statusMessage.type === "loading"
                        })]
                      }), /* @__PURE__ */ jsxs("label", {
                        className: "flex flex-col flex-1",
                        children: [/* @__PURE__ */ jsx("p", {
                          className: "text-base font-medium leading-normal pb-2 text-gray-700 dark:text-gray-300",
                          children: "Mesajınız"
                        }), /* @__PURE__ */ jsx("textarea", {
                          className: "form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-gray-300 dark:border-[#3b4754] bg-white dark:bg-[#1c2127] min-h-36 placeholder:text-gray-400 dark:placeholder:text-[#9dabb9] p-[15px] text-base font-normal leading-normal",
                          placeholder: "Mesajınızı buraya yazın",
                          required: true,
                          name: "message",
                          value: formData.message,
                          onChange: handleChange,
                          disabled: statusMessage.type === "loading"
                        })]
                      }), /* @__PURE__ */ jsx("button", {
                        className: "bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 transition-all duration-300 w-full sm:w-auto flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed",
                        type: "submit",
                        disabled: statusMessage.type === "loading",
                        children: statusMessage.type === "loading" ? /* @__PURE__ */ jsxs(Fragment, {
                          children: [/* @__PURE__ */ jsxs("svg", {
                            className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            children: [/* @__PURE__ */ jsx("circle", {
                              className: "opacity-25",
                              cx: "12",
                              cy: "12",
                              r: "10",
                              stroke: "currentColor",
                              strokeWidth: "4"
                            }), /* @__PURE__ */ jsx("path", {
                              className: "opacity-75",
                              fill: "currentColor",
                              d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            })]
                          }), "Gönderiliyor..."]
                        }) : "Mesajı Gönder"
                      })]
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "lg:w-1/3 p-4 mt-10 lg:mt-0",
                    children: [/* @__PURE__ */ jsx("h2", {
                      className: "text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100",
                      children: "Veya Beni Burada Bulun"
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "space-y-4",
                      children: [/* @__PURE__ */ jsx(ContactInfo, {
                        icon: "mail",
                        text: "sahin.mur4t@gmail.com",
                        link: "sahin.mur4t@gmail.com",
                        isEmail: true
                      }), /* @__PURE__ */ jsx(ContactInfo, {
                        icon: "public",
                        text: "LinkedIn",
                        link: "#"
                      }), /* @__PURE__ */ jsx(ContactInfo, {
                        icon: "code",
                        text: "GitHub",
                        link: "#"
                      }), /* @__PURE__ */ jsx(ContactInfo, {
                        icon: "phone",
                        text: "0554 235 36 49",
                        link: "tel:+905542353649",
                        isEmail: false
                      })]
                    })]
                  })]
                })]
              })
            })
          }), /* @__PURE__ */ jsx(Footer, {})]
        })
      })
    })
  });
};
const ContactPage$1 = UNSAFE_withComponentProps(ContactPage);
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ContactPage$1
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-n1iw2mYZ.js", "imports": ["/assets/chunk-OIYGIGL5-CMUvuLFw.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-ajPBrGC7.js", "imports": ["/assets/chunk-OIYGIGL5-CMUvuLFw.js"], "css": ["/assets/root-DDk8_XoO.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/HomePage": { "id": "pages/HomePage", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/HomePage-jnJpc0gG.js", "imports": ["/assets/chunk-OIYGIGL5-CMUvuLFw.js", "/assets/Header-B7RGeqGK.js", "/assets/Footer-CYrBk8OE.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/AboutMePage": { "id": "pages/AboutMePage", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/AboutMePage-JREdDPI_.js", "imports": ["/assets/chunk-OIYGIGL5-CMUvuLFw.js", "/assets/Header-B7RGeqGK.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/ProjectsPage": { "id": "pages/ProjectsPage", "parentId": "root", "path": "projects", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/ProjectsPage-CB0x97ja.js", "imports": ["/assets/chunk-OIYGIGL5-CMUvuLFw.js", "/assets/Header-B7RGeqGK.js", "/assets/Footer-CYrBk8OE.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/ContactPage": { "id": "pages/ContactPage", "parentId": "root", "path": "contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/ContactPage-yXaf3XY-.js", "imports": ["/assets/chunk-OIYGIGL5-CMUvuLFw.js", "/assets/Header-B7RGeqGK.js", "/assets/Footer-CYrBk8OE.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-794e47e9.js", "version": "794e47e9", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "pages/HomePage": {
    id: "pages/HomePage",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "pages/AboutMePage": {
    id: "pages/AboutMePage",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "pages/ProjectsPage": {
    id: "pages/ProjectsPage",
    parentId: "root",
    path: "projects",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "pages/ContactPage": {
    id: "pages/ContactPage",
    parentId: "root",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
