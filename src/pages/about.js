import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

import Link from "next/link";
import React from "react";

function about() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900">About Me</h1>
        <p className="mt-4 text-gray-500">
          My name is Darnell, and I am a software engineer with a passion for
          creating innovative solutions to complex problems. I studied Computer
          Information science at Aquinas College and completed a program at
          Brainstation to enhance my skills. In addition to my technical
          abilities, I am an avid team sports enthusiast and a dedicated
          volleyball player. As a software engineer, I possess strong
          communication, collaboration, and problem-solving skills, all of which
          have been honed through collaborating on cross function teams during
          my time at brainstation. These skills enable me to efficiently tackle
          complex projects, break them down into manageable tasks and deliver
          high-quality solutions. I'm always looking for opportunities to expand
          my skillset and learn from others. I would love to connect and see how
          I can contribute to the success of your organization!
        </p>
        <div className="mt-10">
          <h2 className="text-xl font-medium text-gray-900">My Socials</h2>
          <Link href="https://www.linkedin.com/in/darnell-eudoxie/">
            <LinkedInIcon />
          </Link>
          <Link href="https://github.com/deudoxie758">
            <GitHubIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default about;
