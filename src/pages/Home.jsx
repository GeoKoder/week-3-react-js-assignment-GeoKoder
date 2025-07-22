import Layout from "../components/layout/Layout";
import TaskManager from "../components/TaskManager";
import PostList from "../components/PostList";

export default function Home() {
  return (
    <Layout>
      <TaskManager />
      <div className="my-8">
        <PostList />
      </div>
    </Layout>
  );
}
