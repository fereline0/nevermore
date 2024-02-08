import Content from "@/components/Content/page";
import SideBar from "@/components/Content/SideBar/page";
import Main from "@/components/Content/Main/page";
import Comments from "@/components/Comments/page";
import Preview from "@/components/Content/SideBar/Preview/page";
import AboutUser from "@/components/Content/Main/AboutUser/page";
import { getUser } from "@/services/user";

export const dynamic = 'force-dynamic'

export default async function currentUser({ params, searchParams } : { params : { id: number }, searchParams: { page: number } })
{
    const page = searchParams.page || 1;
    const limit = 20;
    const currentUser = await getUser(params.id, page, limit);

    return (
        <Content>
            <SideBar>
                <Preview role={currentUser.role} image={currentUser.image} />
            </SideBar>
            <Main>
                <AboutUser user={currentUser} />
                {
                    (() => {
                        const comments = currentUser.comments;
                        
                        if (comments.length > 0) {
                            return (
                                <Comments total={currentUser._count.comments} limit={limit} pastPagesCount={2} futurePagesCount={4} comments={comments} />
                            )
                        }
                    })()
                }
            </Main>
        </Content>
    )
}