import { Avatar } from "@material-ui/core";
import {
  MdAccountCircle,
  MdAddBusiness,
  MdFavoriteBorder,
  MdOutlineGavel,
  MdAttachMoney,
  MdStorefront
} from "react-icons/md";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUsuarioStore } from "@/store/usuarioStore";

export default function MenuPrincipal() {
  const { nombre, avatarUrl, rol } = useUsuarioStore((state) => state.usuario);

  return (
    <Card className="w-full max-w-xs shadow-xl rounded-xl overflow-hidden bg-white">
      <div className="bg-[#3a3a3a] text-white px-4 py-4 flex items-center gap-4">
        <Avatar src={avatarUrl} alt={nombre} />
        <div className="flex flex-col">
          <span className="text-sm text-gray-300">Bienvenido</span>
          <span className="font-semibold">{nombre}</span>
        </div>
      </div>

      <div className="p-4 space-y-1 text-sm text-black">
        <MenuItem icon={<MdAccountCircle size={20} />} label="Mi cuenta" />
        <MenuItem icon={<MdAddBusiness size={20} />} label="Registrar comercio" />
        <MenuItem icon={<MdFavoriteBorder size={20} />} label="Mis favoritos" badge={rol === "asesor" ? "Asesor" : null} />
        <Separator />
        <MenuItem icon={<MdOutlineGavel size={20} />} label="Mis registros" />
        <MenuItem icon={<MdAttachMoney size={20} />} label="Mis comisiones" badge={rol === "empresario" ? "Empresario" : null} />
        <Separator />
        <MenuItem icon={<MdStorefront size={20} />} label="Mi comercio" />
      </div>
    </Card>
  );
}

function MenuItem({ icon, label, badge }) {
  return (
    <div className="flex justify-between items-center px-2 py-2 hover:bg-gray-100 rounded cursor-pointer">
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      {badge && <span className="text-yellow-600 text-xs">{badge}</span>}
    </div>
  );
}
