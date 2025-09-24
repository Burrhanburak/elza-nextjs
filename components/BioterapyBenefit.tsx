"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface TabData {
  id: string;
  image: string;
}

const tabsData: TabData[] = [
  {
    id: "biotherapy",
    image: "/customer/custo-1.png"
  },
  {
    id: "bioenergy", 
    image: "/customer/custo-2.png"
  },
  {
    id: "opportunities",
    image: "/customer/custo-3.png"
  }
];

export default function BioterapyBenefit() {
  const [activeTab, setActiveTab] = useState("biotherapy");
  const t = useTranslations("jobSeeker.benefits.tabs");
  const tabsT = useTranslations("jobSeeker.benefits.tabs");
  
  const currentTab = tabsData.find(tab => tab.id === activeTab) || tabsData[0];
  const currentTabData = t.raw(activeTab);

  return (
    <section className="container  mx-auto my-20">
      <div className="container sm:px-6 lg:px-8">
        <div className="flex-col grid grid-cols-1 gap-8 rounded-2xl border border-border p-4 lg:grid-cols-2 lg:p-8 xl:gap-20">
          <div className="flex flex-col-reverse justify-between gap-8 lg:flex-col">
            <div>
              {/* Active Tab Content */}
              <div className="flex-1 outline-none flex animate-in flex-col gap-6 duration-300 fade-in">
                <span className="text-xs text-muted-foreground uppercase">{t("badge")}</span>
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-medium">
                    {currentTabData.title}<br />
                    <span className="text-muted-foreground">{currentTabData.subtitle}</span>
                  </h2>
                  <p className="text-muted-foreground">
                    {currentTabData.description}
                  </p>
                </div>
                
                {/* Stats */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {currentTabData.stats.map((stat: string, index: number) => (
                    <span key={index} className={`text-xs px-2 py-1 rounded-full ${
                      index === 0 ? 'bg-green-100 text-green-800' :
                      index === 1 ? 'bg-blue-100 text-blue-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {stat}
                    </span>
                  ))}
                </div>

                {/* Benefits List */}
                <div className="flex flex-col gap-3 mt-6">
                  {currentTabData.benefits.map((benefit: string, index: number) => (
                    <div key={index}>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-auto w-4" aria-hidden="true">
                          <path d="m9 12 2 2 4-4"></path>
                          <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1"></path>
                          <path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1"></path>
                        </svg>
                        {benefit}
                      </div>
                      <div className="bg-border shrink-0 h-px w-full mt-2"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Tab Buttons */}
            <div className="w-full flex justify-center mx-auto">
              <div className="bg-muted text-muted-foreground inline-flex max-w-md items-center justify-center h-12 rounded-full p-1">
                {tabsData.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex flex-1 items-center justify-center gap-1.5 border border-transparent text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 h-full rounded-full px-2 py-2 ${
                      activeTab === tab.id
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tabsT(`${tab.id}.label`)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Image Section */}
          <div>
            <div className="flex-1 outline-none animate-in duration-300 fade-in">
              <div className="relative">
                <Image
                  src={currentTab.image}
                  alt={`${currentTabData.title} ${currentTabData.subtitle}`}
                  width={600}
                  height={440}
                  className="h-[440px] w-full rounded-3xl object-cover lg:h-[540px]"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#006241]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 flex flex-col justify-center gap-8 p-6 text-white">
                  <div className="flex flex-col gap-1.5">
                    <p className="text-4xl font-medium lg:text-5xl">{currentTabData.overlayStats.stat1.value}</p>
                    <p className="font-medium">{currentTabData.overlayStats.stat1.label}</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-4xl font-medium lg:text-5xl">{currentTabData.overlayStats.stat2.value}</p>
                    <p className="font-medium">{currentTabData.overlayStats.stat2.label}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 