import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Breadcrumb {
  label: string;
  path?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  children?: React.ReactNode;
}

const PageHeader = ({ title, subtitle, breadcrumbs, children }: PageHeaderProps) => {
  return (
    <div className="pt-28 pb-10 section-padding border-b border-border">
      {breadcrumbs && (
        <div className="flex items-center gap-2 mb-6">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-muted-foreground text-[11px]">/</span>}
              {crumb.path ? (
                <Link
                  to={crumb.path}
                  className="font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-body text-[11px] uppercase tracking-[0.2em] text-foreground">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-end justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl uppercase tracking-wide">
            {title}
          </h1>
          {subtitle && (
            <p className="font-body text-sm text-muted-foreground mt-3">{subtitle}</p>
          )}
        </motion.div>
        {children && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
