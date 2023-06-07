<template>
  <div>
    <div v-if="contextSupportChildren.length == 0">
      <q-item
        clickable
        v-ripple
        class="q-item-active"
        @click.stop="clikItem(id)"
      >
        <q-item-section avatar class="item-bt">
          <q-avatar size="30px">
            <!-- <q-icon name="send" class="icon-color" /> -->
            <img :src="logo" />
          </q-avatar>
        </q-item-section>
        <q-item-section>{{ name }}</q-item-section>
      </q-item>
    </div>
    <div v-else>
      <div v-if="contextSupportChildren.length > 0">
        <q-expansion-item
          :hide-expand-icon="id == 1"
          :disable="id == 1"
          :default-opened="id == 1"
          icon="dashboard"
          :label="name"
        >
          <context-support-recursive
            v-for="child in contextSupportChildren"
            :key="child.id"
            v-bind="child"
          >
          </context-support-recursive>
        </q-expansion-item>
      </div>
      <div v-else>
        <q-item clickable v-ripple>
          <q-item-section>{{ name }}</q-item-section>
        </q-item>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject } from 'vue';
import { useRouter } from 'vue-router';

import { IContextSupport } from '../types/ContextSupport';

interface Props {
  id: number;
  name: string;
  logo: string;
  file: string;
  contextSupportChildren: IContextSupport[];
}

const props = withDefaults(defineProps<Props>(), {
  contextSupportChildren: () => [],
});
const bus = inject<any>('bus');
const $router = useRouter();

const clikItem = (Id: number) => {
  $router.push(`/admin/dashboard/context-add-edit?Id=${Id}`);
  //$router.push('/admin/dashboard/context-add-edit');
  bus.emit('setContextSupport', Id);
};
</script>
<style>
.q-expansion-item {
  border-bottom: 1px dashed #fff;
}
.icon-color {
  color: #fff;
}

.q-focusable .q-hoverable .q-item-active {
  background-color: #5dc697;
  color: #fff;
}
.q-item.q-router-link--active,
.q-item--active {
  color: #fff;
}
.q-item__section--side {
  color: #fff;
}

.q-item__section--side > .q-icon {
  color: #fff !important;
}
</style>
