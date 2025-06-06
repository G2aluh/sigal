import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-7 px-4 bg-card relative border-t  border-border mt-12 pt-8 flex flex-wrap justify-center  items-center">
      {" "}
      <p className="text-sm text-muted-foreground">
        {" "}
        &copy; {new Date().getFullYear()} Galuh.co. All rights reserved.
      </p>
      <a
        href="#hero"
        className="p-2 rounded-full ml-3 bg-primary/10 hidden md:block hover:bg-primary/20 text-primary transition-colors"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};
