import { ItemDetailPage } from "~/features/items/ItemDetailPage";
import { supabase } from "~/server/supabase";

export async function getServerSideProps({ itemId }: { itemId: string }) {
  const { data: itemData } = await supabase
    .from("item")
    .select()
    .eq("id", itemId);

  const item = itemData?.[0];

  const { data: charity } = await supabase
    .from("charity")
    .select()
    .eq("id", item?.charity_id);
  const { data: auction } = await supabase
    .from("auction")
    .select()
    .eq("id", item?.auction_id);

  const itemRichData = {
    ...item,
    charity: charity?.[0],
    auction: auction?.[0],
  };

  return {
    props: {
      item: itemRichData,
    },
  };
}
export default ItemDetailPage;
