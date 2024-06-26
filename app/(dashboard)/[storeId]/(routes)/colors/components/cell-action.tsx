'use client';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColorColumn } from './columns';
import { Button } from '@/components/ui/button';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { AlertModal } from '@/components/modals/alert-modals';

interface CellActionProps {
  data: ColorColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data 
}) => {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Tipe Obat Id sudah dicopy ke clipboard.")
    };

    const onDelete = async () => {
      try {
        setLoading(true);
        await axios.delete(`/api/${params.storeId}/colors/${data.id}`);
        router.refresh();
        toast.success('Tipe Obat Dihapus.');
      } catch (error) {
        toast.error('Pastikan anda sudah menghapus semua Obat yang menggunakan Tipe Obat ini.');
      } finally {
        setLoading(false);
        setOpen(false);
      }
    };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
              Actions
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Perbarui
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className="mr-2 h-4 w-4"/>
                  Hapus
              </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
