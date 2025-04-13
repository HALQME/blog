interface Paginate {
    paginate: (
        items: any[],
        options: {
            pageSize: number;
        }
    ) => any;
}

interface PageProps {
    page: {
        data: any[];
        url: {
            prev: string | undefined;
            next: string | undefined;
        };
        currentPage: number;
    };
}
