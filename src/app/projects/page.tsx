'use client'

import styles from './page.module.css'
import Footer from "../components/footer";
import Header from "../components/header";
import Project from "../components/project";
import crabtrades from "@/public/crabtrades.jpg"
import nukeGreens from "@/public/nukegreens.jpg"
import spooky from "@/public/spooky.jpg"
import lorem from "@/public/lorem.jpg"

export default function Projects() 
{
    const projects = [
        {
            title: "CrabTrades",
            backsideText: "CrabTrades - AI powered stock trading bot",
            background: crabtrades,
            link: "https://crabtrades.nentwich.dev/"
        },
        {
            title: "NukeGreensNuke these Greens: Mars vs Earth",
            backsideText: "Gamejam submission to Mini Jam 166: Earth",
            background: nukeGreens,
            link: "https://bearwithmeplease.itch.io/nuke-these-greens"
        },
        {
            title: "Survive The Bunker",
            backsideText: "Gamejam submission to Brackeys Game Jam 2024.2",
            background: spooky,
            link: "https://bearwithmeplease.itch.io/survive-the-bunker"

        },
        {
            title: "LoremScriptum Compiler",
            backsideText: "Compiler for basic programming language with Latin-inspired syntax ",
            background: lorem,
            link: "https://github.com/vbielov/LoremScriptumCompiler"
        },
    ];

    return(
        <main className={styles.main}>
            <Header />
            <div className={styles.content}>
                <h1 className={styles.title}>My Projects</h1>
                <div className={styles.tileContainer}>
                    {
                        projects.map((project, index) => {
                            return <Project key={index} {...project} />;
                        })
                    }
                </div>
            </div>

            <Footer />
        </main>
    );
}