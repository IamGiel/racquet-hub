import Avatar from "boring-avatars";
import styles from './Landing.module.css';

export default function ProposalList({ proposals }: any) {
  return (
    <ul role="list" className="divide-y divide-gray-800">
      {proposals.map((itemProposed: any) => (
        <li
          key={itemProposed.email}
          className="flex justify-between gap-x-6 py-5"
        >
          <div className="userPic flex min-w-0 gap-x-4" style={{alignItems:'center'}}>
            {/* <img
              className="h-12 w-12 flex-none rounded-full bg-gray-800"
              src={itemProposed.imageUrl}
              alt=""
            /> */}

            <Avatar
              size={40}
              name={itemProposed.name}
              square={false}
              variant="beam"
              colors={["#3d5a80", "#98c1d9", "#3c6e71", "#ee6c4d", "#293241"]}
              />
            <div className={styles.infoContainer + " intfoContainer min-w-0 flex-auto"}>
              <p className="text-sm font-semibold leading-6" style={{color:'#3d5a80'}}>
                {itemProposed.name}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-400">
                {itemProposed.email}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-white">{itemProposed.role}</p>
            {itemProposed.lastSeen ? (
              <p className="mt-1 text-xs leading-5 text-gray-400">
                Last seen{" "}
                <time dateTime={itemProposed.lastSeenDateTime}>
                  {itemProposed.lastSeen}
                </time>
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-400">Online</p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
