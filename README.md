# NextJS App - Hidden Gems (Rebuilt with TypeScript and React Query)
The entire app was rebuilt with TypeScript and React Query for better user experience during page switching.


## Table of contents

- [Enhancement](#enhancement)
  - [Type Safety with TypeScript](#type-safety-with-typescript)
  - [Data caching and mutating with React Query](#data-caching-and-mutating-with-react-query)
- [Links](#Links)
- [Author](#author)

## Enhancement

### Type Safety with TypeScript
Typescript helped eliminating type errors which I experienced a lot with when first building this app with JavaScript, thereby fewer bugs and better developer experience (DX).


```ts
interface GemModalProps {
  onCloseModal: () => void;
  gem: Gem;
  gemmer: Gemmer;
}

const GemModal = ({ onCloseModal, gem, gemmer }: GemModalProps) => {
  return (
    <div className={styles.modal} onClick={onCloseModal}>
      <div className={styles.imageContent}>
        <Image src={gem.image} alt="" layout="fill" objectFit="cover" />
      </div>
      <GemModalDetails
        gem={gem}
        gemmerId={gemmer.id}
        gemmerImage={gemmer.image}
        gemmerUsername={gemmer.username}
      />
    </div>
  );
};

export default GemModal;
```

### Data caching and mutating with React Query

With React Query, API query results are cached during page switching across the entire app with the ability to invalidate query results and re-fetch data when server-side data is mutated.

```ts
export default function useGems() {
  return useQuery(
    ["gems"],
    () => axios.get("/api/gems").then((res) => res.data.gems as Gem[]),
    {
      select: (gems: Gem[]) => {
        return sortGemsByDate(gems);
      },
    }
  );
};

export default function useCreateGem() {
  const queryClient = useQueryClient();

  return useMutation(
    (newGem: Gem) =>
      axios
        .post("/api/gems", {
          newGem,
        })
        .then((res) => res.data.gems),
    {
      onSuccess: (gems: Gem[]) => {
        queryClient.invalidateQueries(["gems"]);
      },
    }
  );
}
```

## Links
- Live Site URL: [Hidden Gems (Rebuilt with TypeScript and React Query)](https://hiddengems-ts.vercel.app/)

- Live Site URL: [Hidden Gems (JS)](https://hiddengems.vercel.app/)
- GitHub: [Hidden Gems(JS)](https://github.com/frankiecflam/next-hidden-gems)

## Author

- Email - [Frankie Lam] cfl.frankie@gmail.com
- Instagram - [@frankie\_\_\_lam](https://www.instagram.com/frankie___lam/)
- Facebook - [Frankie Lam](https://www.facebook.com/frankiecflam/)
