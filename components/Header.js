import { Box, Button, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";

export default function Header() {
  const { setIsSidebarOpen } = useContext(AppContext);

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: { md: "center" },
        gap: "12px",
        padding: { xs: "16px 20px", sm: "16px 40px" },
        backdropFilter: "blur(16px)",
        backgroundColor: "#1C1C1C30",
        width: {
          xs: "100%",
          md: "calc((100%) - 240px)",
        },
      }}>
      <Button
        sx={{ display: { md: "none" } }}
        onClick={() => setIsSidebarOpen(true)}>
        <MenuIcon
          sx={{
            fontSize: "32px",
            color: "#F2F3F4",
          }}
        />
      </Button>
      <Box
        component="section"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}>
        <svg
          className="w-8 h-8 [@media(min-width:900px)]:w-12 [@media(min-width:900px)]:h-12"
          width="50"
          height="50"
          viewBox="0 0 586 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect
            width="586"
            height="600"
            rx="293"
            fill="#007BFF"
          />
          <path
            d="M458 286.5V421.5C457.981 439.396 451.335 456.553 439.521 469.207C427.706 481.862 411.688 488.98 394.98 489H304.457C301.114 489 297.908 487.578 295.545 485.046C293.181 482.514 291.853 479.08 291.853 475.5C291.853 471.92 293.181 468.486 295.545 465.954C297.908 463.422 301.114 462 304.457 462H394.98C405.005 461.988 414.616 457.717 421.704 450.124C428.793 442.532 432.78 432.238 432.792 421.5V419.178C428.745 420.716 424.482 421.502 420.188 421.5H394.98C384.955 421.488 375.344 417.217 368.255 409.624C361.166 402.032 357.179 391.738 357.167 381V313.5C357.179 302.763 361.166 292.468 368.255 284.876C375.344 277.283 384.955 273.012 394.98 273H432.232C429.065 235.912 413.004 201.452 387.234 176.448C361.463 151.445 327.864 137.724 293.093 138.004C293.028 138.005 292.97 138.005 292.905 138.004C258.135 137.725 224.536 151.447 198.766 176.45C172.996 201.453 156.936 235.912 153.768 273H191.02C201.045 273.012 210.656 277.283 217.745 284.876C224.834 292.468 228.821 302.763 228.833 313.5V381C228.821 391.738 224.834 402.032 217.745 409.624C210.656 417.217 201.045 421.488 191.02 421.5H165.812C155.787 421.488 146.176 417.217 139.088 409.624C131.999 402.032 128.011 391.738 128 381V286.5C128 263.35 132.276 240.428 140.583 219.056C148.889 197.683 161.061 178.282 176.397 161.97C191.734 145.657 209.933 132.756 229.944 124.009C249.956 115.262 271.386 110.842 292.999 111.004C293.384 111.002 293.773 111 294.158 111C337.612 111.003 379.286 129.495 410.012 162.407C440.738 195.319 458 239.957 458 286.5Z"
            fill="white"
          />
        </svg>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "24px", md: "36px" },
          }}
          color="#F2F3F4">
          SUPPORTLY
        </Typography>
      </Box>
    </Box>
  );
}
