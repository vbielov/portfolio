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
    const crabTradesProps = {
        title: "CrabTrades",
        background: crabtrades,
        link: "https://crabtrades.nentwich.dev/"
    };

    const nukeGreensProps = {
        title: "NukeGreensNuke these Greens: Mars vs Earth",
        background: nukeGreens,
        link: "https://bearwithmeplease.itch.io/nuke-these-greens"
    }

    const spookyProps = {
        title: "Survive The Bunker",
        background: spooky,
        link: "https://bearwithmeplease.itch.io/survive-the-bunker"
    }

    const loremProps = {
        title: "LoremScriptum Compiler",
        background: lorem,
        link: "https://github.com/vbielov/LoremScriptumCompiler"
    }

    return(
        <main className={styles.main}>
            <Header />
            <div className={styles.tileContainer}>
                <Project {...crabTradesProps}/>
                <Project {...nukeGreensProps}/>
                <Project {...spookyProps}/>
                <Project {...loremProps}/>
            </div>

            <Footer />
        </main>
    );
}